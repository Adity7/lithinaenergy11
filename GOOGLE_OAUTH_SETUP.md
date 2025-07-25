# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the Battery Management System.

## Backend Setup

### 1. Install Dependencies

The required packages are already in `requirements.txt`:
- `google-auth==2.39.0`
- `google-auth-oauthlib==1.2.0`
- `requests-oauthlib==2.0.0`

### 2. Configure Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:8000/api/auth/google/callback/` (for development)
     - `https://yourdomain.com/api/auth/google/callback/` (for production)
5. Copy the Client ID and Client Secret

### 3. Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cd bms_project
   cp env.example .env
   ```

2. Edit the `.env` file with your actual credentials:
   ```bash
   # Google OAuth Settings
   GOOGLE_OAUTH_CLIENT_ID=your-actual-client-id
   GOOGLE_OAUTH_CLIENT_SECRET=your-actual-client-secret
   GOOGLE_OAUTH_REDIRECT_URI=http://localhost:8000/api/auth/google/callback/
   
   # Database Settings (update if different)
   DB_NAME=battery
   DB_USER=postgres
   DB_PASSWORD=abc123
   DB_HOST=localhost
   DB_PORT=5432
   ```

**Important**: Never commit the `.env` file to version control. It's already added to `.gitignore`.

### 4. Run Database Migrations

```bash
cd bms_project
python manage.py makemigrations
python manage.py migrate
```

### 5. Start the Backend Server

```bash
python manage.py runserver
```

## Frontend Setup

### 1. Install Dependencies

The frontend dependencies are already installed.

### 2. Start the Frontend Development Server

```bash
cd frontend/app
npm run dev
```

## API Endpoints

The following OAuth endpoints are available:

- `GET /api/auth/google/url/` - Get Google OAuth URL
- `POST /api/auth/google/callback/` - Handle OAuth callback
- `GET /api/auth/user/` - Get current user info
- `POST /api/auth/logout/` - Logout user

## Usage

1. Navigate to `http://localhost:5173/login`
2. Click "Continue with Google"
3. Complete the Google OAuth flow
4. You'll be redirected back to the dashboard

## Security Notes

- **Never commit your actual Google OAuth credentials to version control**
- The `.env` file is already added to `.gitignore` to prevent accidental commits
- Use environment variables for production (already configured)
- Update the redirect URI for production environments
- Consider implementing CSRF protection for additional security
- Generate a new Django secret key for production:
  ```bash
  python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
  ```

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Make sure the redirect URI in Google Console matches exactly
   - Check for trailing slashes

2. **"Client ID not found" error**
   - Verify your Client ID is correct
   - Ensure the Google+ API is enabled

3. **CORS errors**
   - The backend is configured to allow all origins for development
   - For production, configure specific allowed origins

4. **Database errors**
   - Run migrations: `python manage.py migrate`
   - Check database connection settings

### Debug Mode

For debugging, check the Django logs and browser console for detailed error messages. 