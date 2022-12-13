from rest_framework import serializers
from .models import TrainingPlan
from workouts.models import Workout


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ('id', 'assigned_day', 'week_day')


class TrainingPlanSerializer(serializers.ModelSerializer):
    workouts = WorkoutSerializer(
        many=True, read_only=True, source='workout_set')

    class Meta:
        model = TrainingPlan
        fields = ('user_id', 'id', 'goal', 'calories',
                  'protein', 'carbs', 'fats', 'cost', 'workouts')
        # depth = 1

    user_id = serializers.IntegerField(write_only=True)
