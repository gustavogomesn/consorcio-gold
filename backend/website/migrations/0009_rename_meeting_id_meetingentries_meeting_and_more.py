# Generated by Django 5.1.4 on 2025-01-05 00:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0008_remove_meetingentries_loan_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meetingentries',
            old_name='meeting_id',
            new_name='meeting',
        ),
        migrations.RenameField(
            model_name='meetingentries',
            old_name='member_id',
            new_name='member',
        ),
        migrations.RenameField(
            model_name='temporaryentries',
            old_name='loan_id',
            new_name='loan',
        ),
        migrations.RenameField(
            model_name='temporaryentries',
            old_name='meeting_id',
            new_name='meeting',
        ),
        migrations.RenameField(
            model_name='temporaryentries',
            old_name='member_id',
            new_name='member',
        ),
    ]
