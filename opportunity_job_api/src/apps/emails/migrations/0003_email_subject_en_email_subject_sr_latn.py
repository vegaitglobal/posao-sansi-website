# Generated by Django 4.2.6 on 2023-10-27 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emails', '0002_rename_emailthread_email_alter_email_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='subject_en',
            field=models.CharField(max_length=250, null=True, verbose_name='email subject'),
        ),
        migrations.AddField(
            model_name='email',
            name='subject_sr_latn',
            field=models.CharField(max_length=250, null=True, verbose_name='email subject'),
        ),
    ]
