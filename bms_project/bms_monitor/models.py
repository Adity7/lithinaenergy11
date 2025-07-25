from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=150)

    def __str__(self):
        return self.full_name or str(self.user)

class Battery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=50, unique=True)
    rated_capacity = models.FloatField()
    rated_voltage = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

class BatteryMetric(models.Model):
    battery = models.ForeignKey(Battery, on_delete=models.CASCADE)
    timestamp = models.DateTimeField()
    voltage = models.FloatField()
    current = models.FloatField()
    temperature = models.FloatField()
    soc = models.FloatField()  # State of Charge
    power = models.FloatField(null=True, blank=True)
    energy = models.FloatField(null=True, blank=True)
    grid_usage = models.FloatField(null=True, blank=True)
    solar_generation = models.FloatField(null=True, blank=True)
    home_usage = models.FloatField(null=True, blank=True)

class Alert(models.Model):
    battery = models.ForeignKey(Battery, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    alert_type = models.CharField(max_length=50)
    message = models.TextField()
    status = models.CharField(max_length=10, choices=[('Active', 'Active'), ('Resolved', 'Resolved')], default='Active')