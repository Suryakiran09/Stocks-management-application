from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User

class WatchList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchlists')
    stock_symbol = models.CharField(max_length=10)
    
    class Meta:
        unique_together = ('user', 'stock_symbol')