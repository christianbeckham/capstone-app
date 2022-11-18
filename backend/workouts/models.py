from django.db import models
from training_plans.models import TrainingPlan

# Create your models here.


class Workout(models.Model):

    class Weekdays(models.IntegerChoices):
        MONDAY = 1
        TUESDAY = 2
        WEDNESDAY = 3
        THURSDAY = 4
        FRIDAY = 5
        SATURDAY = 6
        SUNDAY = 7

    training_plan = models.ForeignKey(TrainingPlan, on_delete=models.CASCADE)
    assigned_day = models.IntegerField(choices=Weekdays.choices)
