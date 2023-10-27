# Generated by Django 4.2.6 on 2023-10-27 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_applicantaccount_education_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicantaccount',
            name='about_en',
            field=models.TextField(blank=True, max_length=500, null=True, verbose_name='about me'),
        ),
        migrations.AddField(
            model_name='applicantaccount',
            name='about_sr_latn',
            field=models.TextField(blank=True, max_length=500, null=True, verbose_name='about me'),
        ),
        migrations.AddField(
            model_name='employeraccount',
            name='about_en',
            field=models.TextField(max_length=500, null=True, verbose_name='about company'),
        ),
        migrations.AddField(
            model_name='employeraccount',
            name='about_sr_latn',
            field=models.TextField(max_length=500, null=True, verbose_name='about company'),
        ),
        migrations.AlterField(
            model_name='applicantaccount',
            name='education',
            field=models.CharField(choices=[('none', 'No formal education'), ('first_degree', 'First degree, 4 years of primary school'), ('second_degree', 'Second degree, primary school'), ('third_degree', 'Third degree, high school'), ('fourth_degree', 'Fourth degree, high school'), ('fifth_degree', 'Fifth degree, highly qualified, high school'), ('sixth_degree', 'Sixth degree, higher education, high school'), ('seventh_degree', 'Seventh degree, higher vocational education, higher education school')], default='none', max_length=14, verbose_name='education level'),
        ),
        migrations.AlterField(
            model_name='applicantaccount',
            name='work_experience',
            field=models.CharField(choices=[('none', 'No work experience'), ('lt_year', 'Less than a year'), ('one_to_three', 'More than one less than three years'), ('three_to_five', 'More than three less than five years'), ('five_to_ten', 'More than five less than ten years'), ('gt_ten', 'More than ten years')], default='none', max_length=14, verbose_name='work experience'),
        ),
    ]
