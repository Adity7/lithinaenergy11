from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import random
from bms_monitor.models import Battery, BatteryMetric, Alert, UserProfile

class Command(BaseCommand):
    help = 'Create sample battery data for testing'

    def handle(self, *args, **options):
        # Create sample user if not exists
        user, created = User.objects.get_or_create(
            username='adi',
            defaults={
                'email': 'vyasaditya73@gmail.com',
                'first_name': 'Aditya',
                'last_name': 'Vyas'
            }
        )
        
        if created:
            user.set_password('testpass123')
            user.save()
            UserProfile.objects.create(user=user, full_name='Aditya Vyas')  # type: ignore
            self.stdout.write(f'Created user: {user.username}')
        else:
            self.stdout.write(f'User already exists: {user.username}')

        # Create sample batteries
        batteries_data = [
            {
                'name': 'Home Solar System',
                'model': 'PowerCore Pro X1',
                'serial_number': 'BAT-2024-001',
                'rated_capacity': 100.0,
                'rated_voltage': 48.0
            },
            {
                'name': 'Backup System',
                'model': 'PowerCore Compact',
                'serial_number': 'BAT-2024-002',
                'rated_capacity': 50.0,
                'rated_voltage': 24.0
            }
        ]

        for battery_data in batteries_data:
            battery, created = Battery.objects.get_or_create(  # type: ignore
                serial_number=battery_data['serial_number'],
                defaults={
                    'user': user,
                    'name': battery_data['name'],
                    'model': battery_data['model'],
                    'rated_capacity': battery_data['rated_capacity'],
                    'rated_voltage': battery_data['rated_voltage']
                }
            )
            
            if created:
                self.stdout.write(f'Created battery: {battery.name}')
            else:
                self.stdout.write(f'Battery already exists: {battery.name}')

            # Create sample metrics for the last 30 days
            for i in range(30):
                timestamp = timezone.now() - timedelta(days=29-i)
                
                # Generate realistic battery metrics
                base_soc = 85 + random.uniform(-15, 15)
                soc = max(20, min(100, base_soc))
                
                base_temp = 25 + random.uniform(-5, 8)
                temperature = max(15, min(40, base_temp))
                
                base_voltage = battery.rated_voltage + random.uniform(-2, 2)
                voltage = max(battery.rated_voltage * 0.8, min(battery.rated_voltage * 1.2, base_voltage))
                
                current = random.uniform(-10, 10)
                power = voltage * current
                
                # Create metric
                metric, created = BatteryMetric.objects.get_or_create(  # type: ignore
                    battery=battery,
                    timestamp=timestamp,
                    defaults={
                        'voltage': round(voltage, 2),
                        'current': round(current, 2),
                        'temperature': round(temperature, 1),
                        'soc': round(soc, 1),
                        'power': round(power, 2),
                        'energy': round(power * 0.1, 2),  # Simplified energy calculation
                        'grid_usage': round(random.uniform(0, 5), 2),
                        'solar_generation': round(random.uniform(0, 8), 2),
                        'home_usage': round(random.uniform(2, 6), 2)
                    }
                )
                
                if created:
                    self.stdout.write(f'Created metric for {battery.name} at {timestamp.date()}')

            # Create sample alerts
            alert_types = ['High Temperature', 'Low Voltage', 'Overcharge', 'System Error']
            for i in range(3):
                alert_timestamp = timezone.now() - timedelta(days=random.randint(1, 7))
                alert_type = random.choice(alert_types)
                
                alert, created = Alert.objects.get_or_create(  # type: ignore
                    battery=battery,
                    alert_type=alert_type,
                    timestamp=alert_timestamp,
                    defaults={
                        'message': f'{alert_type} detected on {battery.name}',
                        'status': 'Active' if i == 0 else 'Resolved'
                    }
                )
                
                if created:
                    self.stdout.write(f'Created alert: {alert_type} for {battery.name}')

        self.stdout.write(
            'Successfully created sample data!'
        ) 