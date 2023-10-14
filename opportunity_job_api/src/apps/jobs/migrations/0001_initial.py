# Generated by Django 4.2.6 on 2023-10-14 07:58

import django_extensions.db.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('question', models.CharField(max_length=250, verbose_name='question')),
                ('answer', models.CharField(max_length=250, verbose_name='answer')),
                ('display_to_anonymous', models.BooleanField(default=False, verbose_name='display to anonymous')),
                ('display_to_employers', models.BooleanField(default=False, verbose_name='display to employers')),
                ('display_to_applicants', models.BooleanField(default=False, verbose_name='display to applicants')),
            ],
            options={
                'verbose_name': 'FAQ',
                'verbose_name_plural': 'Frequently Asked Questions',
            },
        ),
    ]
