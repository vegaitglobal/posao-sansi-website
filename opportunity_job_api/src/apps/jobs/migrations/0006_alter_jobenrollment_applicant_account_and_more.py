# Generated by Django 4.2.6 on 2023-10-14 19:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_applicantaccount_education_and_more'),
        ('jobs', '0005_jobenrollment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobenrollment',
            name='applicant_account',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.applicantaccount', verbose_name='applicant account'),
        ),
        migrations.AlterField(
            model_name='jobenrollment',
            name='job_offer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='jobs.joboffer', verbose_name='job offer'),
        ),
        migrations.AlterField(
            model_name='joboffer',
            name='application_deadline',
            field=models.DateTimeField(verbose_name='application deadline'),
        ),
        migrations.AlterField(
            model_name='joboffer',
            name='employer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.employeraccount', verbose_name='employer'),
        ),
    ]
