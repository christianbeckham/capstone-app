from rest_framework import serializers
from .models import TrainingPlan


class TrainingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlan
        fields = ('user_id', 'id', 'goal', 'weekly_workout_days', 'cost')
