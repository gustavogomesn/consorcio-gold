# Generated by Django 5.1.4 on 2024-12-28 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_loans'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='loans',
            name='stocks',
        ),
        migrations.AddField(
            model_name='loans',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]
