from django.db import models
from authentication.models import User

# Create your models here.


class CheckIn(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=4, decimal_places=1)
    weekly_review = models.CharField(max_length=255)
    trainer_feedback = models.CharField(max_length=255, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_date']
