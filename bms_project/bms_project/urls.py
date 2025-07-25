"""
URL configuration for bms_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from bms_monitor.views import router, SignupView, dashboard_data, battery_metrics, test_api
from bms_monitor.oauth_views import google_oauth_url, google_oauth_callback, get_user_info, logout

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/auth/google/url/', google_oauth_url, name='google_oauth_url'),
    path('api/auth/google/callback/', google_oauth_callback, name='google_oauth_callback'),
    path('api/auth/user/', get_user_info, name='get_user_info'),
    path('api/auth/logout/', logout, name='logout'),
    path('api/test/', test_api, name='test_api'),
    path('api/dashboard/', dashboard_data, name='dashboard_data'),
    path('api/battery/<str:battery_id>/metrics/', battery_metrics, name='battery_metrics'),
    path('api/', include(router.urls)),
]
