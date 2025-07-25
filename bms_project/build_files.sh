#!/bin/bash
# Build script for Vercel deployment

# Install Python dependencies
pip install -r requirements.txt

# Run Django migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create superuser if needed (optional)
# echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'password') if not User.objects.filter(username='admin').exists() else None" | python manage.py shell 