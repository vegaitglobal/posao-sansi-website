# Generated by Django 4.2.6 on 2023-11-06 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0013_alter_joboffer_employer_alter_joboffer_engagement_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joboffer',
            name='application_deadline',
            field=models.DateField(verbose_name='application deadline'),
        ),
    ]
