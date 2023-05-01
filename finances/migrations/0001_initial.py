# Generated by Django 4.1.7 on 2023-04-30 14:58

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('amount', models.FloatField()),
                ('tag', models.CharField(choices=[('food', 'Food'), ('transport', 'Transport'), ('bills', 'Bills'), ('fees', 'Fees'), ('misc', 'Misc')], max_length=50)),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
