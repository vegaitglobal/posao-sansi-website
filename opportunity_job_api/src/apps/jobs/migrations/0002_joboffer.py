# Generated by Django 4.2.6 on 2023-10-14 12:24

import django_extensions.db.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobOffer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('job_name', models.CharField(max_length=250, verbose_name='job name')),
                ('job_description', models.TextField(verbose_name='job description')),
                ('location', models.CharField(max_length=250, verbose_name='location')),
                ('application_deadline', models.DateTimeField()),
                ('engagement', models.CharField(choices=[('course', 'Course or internship'), ('unpaid_internship', 'Unpaid internship'), ('paid_internship', 'Paid internship'), ('part_time', 'Part time job offer'), ('full_time', 'Full time job offer')], default='full_time', help_text='This field contains the type of Job Offer', max_length=20, verbose_name='engagement')),
                ('category', models.CharField(choices=[('sales_and_trade', 'Sales and Trade'), ('tourism_and_catering', 'Tourism and Catering'), ('transport_and_logistics', 'Transport and Logistics'), ('cleaning_and_maintenance', 'Cleaning nad Maintenance'), ('production_jobs', 'Jobs in production industry'), ('food_technology', 'Food technology'), ('beauty_care', 'Beauty Care'), ('other', 'Other')], default='other', help_text='This field contains the category of Job Offer', max_length=30, verbose_name='category')),
                ('required_work_experience', models.CharField(choices=[('none', 'No work experience'), ('lt_year', 'Less than a year'), ('one_to_three', 'More than one less than three years'), ('three_to_five', 'More than three less than five years'), ('five_to_ten', 'More than five less than ten years'), ('gt_ten', 'More than ten years')], default='none', help_text='This field represents requiered work experience', max_length=20, verbose_name='required work experience')),
                ('additional_skills', models.CharField(max_length=250, verbose_name='additional skills')),
                ('is_active', models.BooleanField(default=False, verbose_name='is active')),
            ],
            options={
                'verbose_name': 'Job Offer',
                'verbose_name_plural': 'Job Offers',
            },
        ),
    ]
