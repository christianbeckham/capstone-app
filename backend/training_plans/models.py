from django.db import models
from authentication.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class TrainingPlan(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='training_plan')
    goal = models.CharField(max_length=255)
    weekly_workout_days = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(7)])
    cost = models.DecimalField(max_digits=5, decimal_places=2)
