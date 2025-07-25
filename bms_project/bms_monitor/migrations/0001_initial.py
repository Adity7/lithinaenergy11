# Generated by Django 5.2.4 on 2025-07-12 10:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Battery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
                ('serial_number', models.CharField(max_length=50, unique=True)),
                ('rated_capacity', models.FloatField()),
                ('rated_voltage', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Alert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('alert_type', models.CharField(max_length=50)),
                ('message', models.TextField()),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Resolved', 'Resolved')], default='Active', max_length=10)),
                ('battery', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bms_monitor.battery')),
            ],
        ),
        migrations.CreateModel(
            name='BatteryMetric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('voltage', models.FloatField()),
                ('current', models.FloatField()),
                ('temperature', models.FloatField()),
                ('soc', models.FloatField()),
                ('power', models.FloatField(blank=True, null=True)),
                ('energy', models.FloatField(blank=True, null=True)),
                ('grid_usage', models.FloatField(blank=True, null=True)),
                ('solar_generation', models.FloatField(blank=True, null=True)),
                ('home_usage', models.FloatField(blank=True, null=True)),
                ('battery', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bms_monitor.battery')),
            ],
        ),
    ]
