from django.db import models
from authentication.models import User

# Create your models here.


class TrainingPlan(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='training_plan')
    goal = models.CharField(max_length=255)
    cost = models.DecimalField(max_digits=5, decimal_places=2)
    calories = models.PositiveSmallIntegerField(default=0)
    protein = models.PositiveSmallIntegerField(default=0)
    carbs = models.PositiveSmallIntegerField(default=0)
    fats = models.PositiveSmallIntegerField(default=0)
