# Generated by Django 4.2.6 on 2023-10-29 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0009_joboffer_additional_skills_en_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joboffer',
            name='additional_skills',
            field=models.TextField(blank=True, verbose_name='additional skills'),
        ),
        migrations.AlterField(
            model_name='joboffer',
            name='additional_skills_en',
            field=models.TextField(blank=True, null=True, verbose_name='additional skills'),
        ),
        migrations.AlterField(
            model_name='joboffer',
            name='additional_skills_sr_latn',
            field=models.TextField(blank=True, null=True, verbose_name='additional skills'),
        ),
    ]