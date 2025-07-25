from django.contrib import admin
from .models import Battery, BatteryMetric, Alert, UserProfile
import random
from datetime import datetime, timedelta


def duplicate_battery_metrics(modeladmin, request, queryset):
    for obj in queryset:
        obj.pk = None  # This will create a new object when saved
        # Only battery is preserved, everything else is random
        obj.timestamp = datetime.now() - timedelta(days=random.randint(0, 30), hours=random.randint(0, 23), minutes=random.randint(0, 59))
        obj.voltage = round(random.uniform(40.0, 60.0), 2)
        obj.current = round(random.uniform(-100.0, 100.0), 2)
        obj.temperature = round(random.uniform(10.0, 50.0), 2)
        obj.soc = round(random.uniform(0, 100), 2)
        obj.power = round(random.uniform(0, 5000), 2)
        obj.energy = round(random.uniform(0, 10000), 2)
        obj.grid_usage = round(random.uniform(0, 10000), 2)
        obj.solar_generation = round(random.uniform(0, 10000), 2)
        obj.home_usage = round(random.uniform(0, 10000), 2)
        obj.save()
duplicate_battery_metrics.short_description = "Duplicate selected Battery Metrics with random values except battery"


class BatteryMetricAdmin(admin.ModelAdmin):
    actions = [duplicate_battery_metrics]

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "full_name")
    search_fields = ("user__username", "full_name")

admin.site.register(Battery)
admin.site.register(BatteryMetric, BatteryMetricAdmin)
admin.site.register(Alert)
admin.site.register(UserProfile, UserProfileAdmin)
