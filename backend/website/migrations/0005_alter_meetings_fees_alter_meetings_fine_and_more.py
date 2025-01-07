# Generated by Django 5.1.4 on 2025-01-04 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0004_meetings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meetings',
            name='fees',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='meetings',
            name='fine',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='meetings',
            name='loans',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='meetings',
            name='stocks',
            field=models.IntegerField(default=0),
        ),
    ]
