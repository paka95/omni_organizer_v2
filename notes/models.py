from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=255, blank=True, default="Untitled")
    content = models.TextField(blank=True, default="No content")
    last_updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title