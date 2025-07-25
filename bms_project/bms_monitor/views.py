from rest_framework import viewsets
from .models import Battery, BatteryMetric, Alert, UserProfile
from .serializers import BatterySerializer, BatteryMetricSerializer, AlertSerializer, UserSignupSerializer, UserProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import routers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Avg, Max, Min, Count
from django.utils import timezone
from datetime import timedelta

# Create your views here.

class BatteryViewSet(viewsets.ModelViewSet):
    queryset = Battery.objects.all()  # type: ignore
    serializer_class = BatterySerializer

class BatteryMetricViewSet(viewsets.ModelViewSet):
    queryset = BatteryMetric.objects.all()  # type: ignore
    serializer_class = BatteryMetricSerializer

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()  # type: ignore
    serializer_class = AlertSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()  # type: ignore
    serializer_class = UserProfileSerializer

class SignupView(APIView):
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def test_api(request):
    """Test endpoint to verify API is working"""
    return Response({
        'message': 'API is working!',
        'user': request.user.username if request.user.is_authenticated else 'Anonymous'
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def dashboard_data(request):
    """Get dashboard data for the authenticated user"""
    print(f"Dashboard API called by user: {request.user}")
    print(f"User is authenticated: {request.user.is_authenticated}")
    
    # Try to get user from session if not authenticated
    if not request.user.is_authenticated:
        user_id = request.session.get('user_id')
        if user_id:
            from django.contrib.auth.models import User
            try:
                user = User.objects.get(id=user_id)  # type: ignore
                print(f"Found user from session: {user.get_full_name()}")
            except User.DoesNotExist:  # type: ignore
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        user = request.user
    
    # Get user's batteries
    batteries = Battery.objects.filter(user=user)  # type: ignore
    
    # Get latest metrics for each battery
    dashboard_batteries = []
    total_capacity = 0
    total_cycles = 0
    avg_health = 0
    
    for battery in batteries:
        # Get latest metric
        latest_metric = BatteryMetric.objects.filter(battery=battery).order_by('-timestamp').first()  # type: ignore
        
        if latest_metric:
            # Calculate battery health (simplified calculation)
            health = min(100, max(0, 100 - (latest_metric.temperature - 25) * 2))
            
            # Get historical data for charts
            days = 30
            start_date = timezone.now() - timedelta(days=days)
            historical_data = BatteryMetric.objects.filter(  # type: ignore
                battery=battery,
                timestamp__gte=start_date
            ).order_by('timestamp')
            
            chart_data = []
            for metric in historical_data:
                chart_data.append({
                    'date': metric.timestamp.strftime('%b %d'),
                    'soc': metric.soc,
                    'temperature': metric.temperature,
                    'voltage': metric.voltage,
                    'power': metric.power or 0,
                    'efficiency': min(100, max(0, 100 - (metric.temperature - 25) * 2))
                })
            
            battery_data = {
                'id': battery.id,  # Database ID
                'name': battery.name,
                'model': battery.model,
                'serial_number': battery.serial_number,
                'rated_capacity': battery.rated_capacity,
                'rated_voltage': battery.rated_voltage,
                'created_at': battery.created_at.isoformat(),
                'user': battery.user.id,
                'currentSoC': round(latest_metric.soc, 1),
                'health': round(health, 1),
                'cycles': 0,  # You can add cycle count to your model
                'temperature': round(latest_metric.temperature, 1),
                'voltage': round(latest_metric.voltage, 2),
                'current': round(latest_metric.current, 2),
                'power': round(latest_metric.power, 2) if latest_metric.power else 0,
                'energy': round(latest_metric.energy, 2) if latest_metric.energy else 0,
                'grid_usage': round(latest_metric.grid_usage, 2) if latest_metric.grid_usage else 0,
                'solar_generation': round(latest_metric.solar_generation, 2) if latest_metric.solar_generation else 0,
                'home_usage': round(latest_metric.home_usage, 2) if latest_metric.home_usage else 0,
                'status': 'Excellent' if health > 90 else 'Good' if health > 80 else 'Fair',
                'historicalData': chart_data
            }
            
            dashboard_batteries.append(battery_data)
            total_capacity += battery.rated_capacity
            avg_health += health
    
    if dashboard_batteries:
        avg_health = avg_health / len(dashboard_batteries)
    
    # Get recent alerts
    recent_alerts = Alert.objects.filter(  # type: ignore
        battery__user=user,
        timestamp__gte=timezone.now() - timedelta(days=7)
    ).order_by('-timestamp')[:5]
    
    alerts_data = []
    for alert in recent_alerts:
        alerts_data.append({
            'id': alert.id,
            'type': alert.alert_type,
            'message': alert.message,
            'status': alert.status,
            'timestamp': alert.timestamp.isoformat(),
            'battery': alert.battery.name
        })
    
    # Calculate dashboard stats from raw data
    stats = {
        'totalBatteries': len(dashboard_batteries),
        'totalCapacity': total_capacity,
        'avgHealth': round(avg_health, 1),
        'totalCycles': total_cycles,
        'activeAlerts': Alert.objects.filter(battery__user=user, status='Active').count()  # type: ignore
    }
    
    return Response({
        'user': {
            'id': user.id,
            'name': user.get_full_name() or user.username,
            'email': user.email,
            'tier': 'Premium',  # You can add tier to your model
            'joinDate': user.date_joined.strftime('%Y-%m-%d')
        },
        'batteries': dashboard_batteries,
        'stats': stats,
        'alerts': alerts_data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def battery_metrics(request, battery_id):
    """Get metrics for a specific battery"""
    try:
        battery = Battery.objects.get(serial_number=battery_id, user=request.user)  # type: ignore
        days = int(request.GET.get('days', 30))
        start_date = timezone.now() - timedelta(days=days)
        
        metrics = BatteryMetric.objects.filter(  # type: ignore
            battery=battery,
            timestamp__gte=start_date
        ).order_by('timestamp')
        
        data = []
        for metric in metrics:
            data.append({
                'date': metric.timestamp.strftime('%b %d'),
                'soc': metric.soc,
                'temperature': metric.temperature,
                'voltage': metric.voltage,
                'power': metric.power or 0,
                'efficiency': min(100, max(0, 100 - (metric.temperature - 25) * 2))
            })
        
        return Response(data)
    except Battery.DoesNotExist:  # type: ignore
        return Response({'error': 'Battery not found'}, status=status.HTTP_404_NOT_FOUND)

router = routers.DefaultRouter()
router.register(r'batteries', BatteryViewSet)
router.register(r'battery-metrics', BatteryMetricViewSet)
router.register(r'alerts', AlertViewSet)
router.register(r'userprofiles', UserProfileViewSet)
