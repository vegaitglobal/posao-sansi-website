# Generated by Django 4.2.6 on 2023-10-14 12:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_applicantaccount_education_and_more'),
        ('jobs', '0002_joboffer'),
    ]

    operations = [
        migrations.AddField(
            model_name='joboffer',
            name='employer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.employeraccount'),
        ),
    ]
