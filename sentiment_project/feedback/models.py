from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    sentiment = models.CharField(max_length=20, blank=True)  # e.g. Positive, Neutral, Negative
    created_at = models.DateTimeField(auto_now_add=True)