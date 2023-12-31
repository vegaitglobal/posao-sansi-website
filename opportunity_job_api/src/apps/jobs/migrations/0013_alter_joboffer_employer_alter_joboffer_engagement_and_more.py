# Generated by Django 4.2.6 on 2023-11-04 08:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_passwordresetemail'),
        ('jobs', '0012_alter_jobenrollment_is_pending'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joboffer',
            name='employer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.employeraccount', verbose_name='employer'),
        ),
        migrations.AlterField(
            model_name='joboffer',
            name='engagement',
            field=models.CharField(choices=[('course', 'Course or internship'), ('unpaid_internship', 'Unpaid internship'), ('paid_internship', 'Paid internship'), ('part_time', 'Part time job offer'), ('full_time', 'Full time job offer')], max_length=20, verbose_name='engagement'),
        ),
        migrations.AlterField(
            model_name='joboffer',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='is active'),
        ),
    ]
