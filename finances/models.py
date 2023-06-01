from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class Expense(models.Model):
    TAG_CHOICES = [
        ('food', 'Food'),
        ('transport', 'Transport'),
        ('bills', 'Bills'),
        ('fees', 'Fees'),
        ('misc', 'Misc')
    ]

    title = models.CharField(max_length=100)
    amount = models.FloatField()
    tag = models.CharField(max_length=50, choices=TAG_CHOICES)
    date_created = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title} ({self.amount})"