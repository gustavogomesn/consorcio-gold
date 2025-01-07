# Generated by Django 5.1.4 on 2025-01-04 23:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0005_alter_meetings_fees_alter_meetings_fine_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='loans',
            name='remaining_value',
            field=models.FloatField(default=2000),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='MeetingEntries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('value', models.FloatField()),
                ('meeting_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.meetings')),
                ('member_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.members')),
            ],
        ),
        migrations.CreateModel(
            name='TemporaryEntries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('value', models.FloatField()),
                ('meeting_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.meetings')),
                ('member_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.members')),
            ],
        ),
    ]
