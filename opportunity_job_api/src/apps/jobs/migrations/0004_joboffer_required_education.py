# Generated by Django 4.2.6 on 2023-10-14 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_joboffer_employer'),
    ]

    operations = [
        migrations.AddField(
            model_name='joboffer',
            name='required_education',
            field=models.CharField(choices=[('none', 'No formal education'), ('first_degree', 'First degree, 4 years of primary school'), ('second_degree', 'Second degree, primary school'), ('third_degree', 'Third degree, high school'), ('fourth_degree', 'Fourth degree, high school'), ('fifth_degree', 'Fifth degree, highly qualified, high school'), ('sixth_degree', 'Sixth degree, higher education, high school'), ('seventh_degree', 'Seventh degree, higher vocational education, higher education school')], default='none', help_text='This field represents requiered education', max_length=20, verbose_name='required education'),
        ),
    ]