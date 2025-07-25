#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bms_project.settings')
django.setup()

from django.contrib.auth.models import User
from bms_monitor.models import Battery, BatteryMetric, Alert, UserProfile

def show_raw_data():
    print("=" * 50)
    print("RAW DATA FROM DJANGO MODELS")
    print("=" * 50)
    
    # User Data
    print("\n=== USER DATA ===")
    try:
        user = User.objects.get(username='adi')
        print(f"ID: {user.id}")
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
        print(f"First Name: {user.first_name}")
        print(f"Last Name: {user.last_name}")
        print(f"Date Joined: {user.date_joined}")
    except User.DoesNotExist:  # type: ignore
        print("User 'adi' not found")
    
    # User Profile
    print("\n=== USER PROFILE ===")
    try:
        profile = UserProfile.objects.get(user=user)  # type: ignore
        print(f"User ID: {profile.user.id}")
        print(f"Full Name: {profile.full_name}")
    except UserProfile.DoesNotExist:  # type: ignore
        print("UserProfile not found for this user")
    
    # Batteries
    print("\n=== BATTERIES ===")
    batteries = Battery.objects.filter(user=user)  # type: ignore
    print(f"Total Batteries: {batteries.count()}")
    for b in batteries:
        print(f"\nBattery ID: {b.id}")
        print(f"Name: {b.name}")
        print(f"Model: {b.model}")
        print(f"Serial Number: {b.serial_number}")
        print(f"Rated Capacity: {b.rated_capacity} kWh")
        print(f"Rated Voltage: {b.rated_voltage} V")
        print(f"Created At: {b.created_at}")
    
    # Battery Metrics (Latest 3 for each battery)
    print("\n=== BATTERY METRICS (Latest 3 per battery) ===")
    for b in batteries:
        print(f"\nBattery: {b.name}")
        metrics = BatteryMetric.objects.filter(battery=b).order_by('-timestamp')[:3]  # type: ignore
        print(f"Total Metrics: {BatteryMetric.objects.filter(battery=b).count()}")  # type: ignore
        for m in metrics:
            print(f"  Timestamp: {m.timestamp}")
            print(f"  Voltage: {m.voltage} V")
            print(f"  Current: {m.current} A")
            print(f"  Temperature: {m.temperature}°C")
            print(f"  SOC: {m.soc}%")
            print(f"  Power: {m.power} W")
            print(f"  Energy: {m.energy} kWh")
            print(f"  Grid Usage: {m.grid_usage} kWh")
            print(f"  Solar Generation: {m.solar_generation} kWh")
            print(f"  Home Usage: {m.home_usage} kWh")
            print("  ---")
    
    # Alerts
    print("\n=== ALERTS ===")
    alerts = Alert.objects.filter(battery__user=user).order_by('-timestamp')[:5]  # type: ignore
    print(f"Total Alerts: {Alert.objects.filter(battery__user=user).count()}")  # type: ignore
    for a in alerts:
        print(f"\nAlert ID: {a.id}")
        print(f"Battery: {a.battery.name}")
        print(f"Type: {a.alert_type}")
        print(f"Message: {a.message}")
        print(f"Status: {a.status}")
        print(f"Timestamp: {a.timestamp}")

if __name__ == "__main__":
    show_raw_data() 