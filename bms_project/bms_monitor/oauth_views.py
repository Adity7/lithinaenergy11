import json
import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from .models import UserProfile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([AllowAny])
def google_oauth_url(request):
    """Generate Google OAuth URL"""
    google_oauth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth?"
        "client_id={}&"
        "redirect_uri={}&"
        "scope=openid%20email%20profile&"
        "response_type=code&"
        "access_type=offline"
    ).format(
        settings.GOOGLE_OAUTH_CLIENT_ID,
        settings.GOOGLE_OAUTH_REDIRECT_URI
    )
    
    return Response({
        'auth_url': google_oauth_url
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def google_oauth_callback(request):
    """Handle Google OAuth callback"""
    try:
        # Get authorization code from request
        auth_code = request.GET.get('code')
        
        if not auth_code:
            return Response({
                'error': 'Authorization code is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Exchange authorization code for access token
        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            'client_id': settings.GOOGLE_OAUTH_CLIENT_ID,
            'client_secret': settings.GOOGLE_OAUTH_CLIENT_SECRET,
            'code': auth_code,
            'grant_type': 'authorization_code',
            'redirect_uri': settings.GOOGLE_OAUTH_REDIRECT_URI,
        }
        
        token_response = requests.post(token_url, data=token_data)
        token_response.raise_for_status()
        token_info = token_response.json()
        
        access_token = token_info.get('access_token')
        
        # Get user info from Google
        user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {'Authorization': f'Bearer {access_token}'}
        user_response = requests.get(user_info_url, headers=headers)
        user_response.raise_for_status()
        user_info = user_response.json()
        
        # Extract user information
        google_id = user_info.get('id')
        email = user_info.get('email')
        first_name = user_info.get('given_name', '')
        last_name = user_info.get('family_name', '')
        full_name = user_info.get('name', '')
        picture = user_info.get('picture', '')
        
        # Check if user exists
        users_with_email = User.objects.filter(email=email)
        if users_with_email.exists():
            # If multiple users exist with same email, use the first one
            user = users_with_email.first()
        else:
            # Create new user
            username = email.split('@')[0]  # Use email prefix as username
            # Ensure username is unique
            base_username = username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
            
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                password=None  # No password for OAuth users
            )
            
            # Create user profile
            UserProfile.objects.create(  # type: ignore
                user=user,
                full_name=full_name
            )
        
        # Log in the user
        login(request, user)
        
        # Set session data
        request.session['user_id'] = user.id
        request.session['user_email'] = user.email
        request.session['user_name'] = full_name
        
        # Redirect to frontend dashboard with user data
        from django.shortcuts import redirect
        from urllib.parse import urlencode
        
        # Create a URL with user data to pass to frontend
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'full_name': full_name,
            'picture': picture
        }
        
        # Encode user data as URL parameters
        user_params = urlencode(user_data)
        frontend_url = f"http://localhost:8080/dashboard?{user_params}&auth_success=true"
        
        return redirect(frontend_url)
        
    except requests.RequestException as e:
        return Response({
            'error': f'Failed to authenticate with Google: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'error': f'An error occurred: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_user_info(request):
    """Get current user information"""
    if request.user.is_authenticated:
        try:
            profile = request.user.profile
            return Response({
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'email': request.user.email,
                    'first_name': request.user.first_name,
                    'last_name': request.user.last_name,
                    'full_name': profile.full_name if profile else '',
                }
            })
        except ObjectDoesNotExist:
            return Response({
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'email': request.user.email,
                    'first_name': request.user.first_name,
                    'last_name': request.user.last_name,
                    'full_name': '',
                }
            })
    else:
        return Response({
            'error': 'User not authenticated'
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout(request):
    """Logout user"""
    from django.contrib.auth import logout
    logout(request)
    return Response({
        'message': 'Successfully logged out'
    }) 