# Generated by Django 5.1.4 on 2025-01-20 19:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0010_rename_loans_meetings_loans_made_loans_meeting_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='temporaryentries',
            name='loan',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='website.loans'),
        ),
    ]
