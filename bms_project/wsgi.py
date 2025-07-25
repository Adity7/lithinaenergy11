"""
WSGI config for bms_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys
from pathlib import Path

# Add the project directory to the Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bms_project.settings')

application = get_wsgi_application()

# Add WhiteNoise for static file serving
application = WhiteNoise(application, root='staticfiles/')
application.add_files('staticfiles/', prefix='static/') 