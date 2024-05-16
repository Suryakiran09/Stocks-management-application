# Generated by Django 4.2.7 on 2024-05-16 07:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0002_alter_watchlist_stock_symbol'),
    ]

    operations = [
        migrations.AlterField(
            model_name='watchlist',
            name='stock_symbol',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterUniqueTogether(
            name='watchlist',
            unique_together={('user', 'stock_symbol')},
        ),
    ]
