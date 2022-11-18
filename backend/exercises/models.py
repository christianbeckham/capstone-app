from django.db import models
from workouts.models import Workout
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class Exercise(models.Model):

    class TimeInterval(models.TextChoices):
        SECONDS = 'seconds'
        MINUTES = 'minutes'

    workouts = models.ManyToManyField(Workout)
    name = models.CharField(max_length=255)
    sets = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)])
    reps = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(30)])
    rest_time = models.PositiveIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(60)])
    time_interval = models.CharField(
        choices=TimeInterval.choices, default=TimeInterval.SECONDS)
