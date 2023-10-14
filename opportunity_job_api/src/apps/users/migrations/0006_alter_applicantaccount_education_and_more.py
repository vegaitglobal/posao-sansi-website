# Generated by Django 4.2.6 on 2023-10-14 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_user_account_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicantaccount',
            name='education',
            field=models.CharField(choices=[('none', 'No formal education'), ('first_degree', 'First degree, 4 years of primary school'), ('second_degree', 'Second degree, primary school'), ('third_degree', 'Third degree, high school'), ('fourth_degree', 'Fourth degree, high school'), ('fifth_degree', 'Fifth degree, highly qualified, high school'), ('sixth_degree', 'Sixth degree, higher education, high school'), ('seventh_degree', 'Seventh degree, higher vocational education, higher education school')], default='none', help_text='Education of the applicant', max_length=14, verbose_name='education level'),
        ),
        migrations.AlterField(
            model_name='applicantaccount',
            name='work_experience',
            field=models.CharField(choices=[('none', 'No work experience'), ('lt_year', 'Less than a year'), ('one_to_three', 'More than one less than three years'), ('three_to_five', 'More than three less than five years'), ('five_to_ten', 'More than five less than ten years'), ('gt_ten', 'More than ten years')], default='none', help_text='Work experience of the applicant', max_length=14, verbose_name='work experience'),
        ),
    ]