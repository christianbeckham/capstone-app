from rest_framework import serializers
from .models import Workout
from exercises.serializers import ExerciseSerializer


class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(read_only=True, many=True, source="exercise_set")
    week_day = serializers.ReadOnlyField()

    class Meta:
        model = Workout
        fields = ('id', 'assigned_day', 'training_plan_id',
                  'week_day', 'exercises')

    training_plan_id = serializers.IntegerField()
