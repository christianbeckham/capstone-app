from rest_framework import serializers
from .models import Workout
from exercises.serializers import ExerciseSerializer


class WorkoutSerializer(serializers.ModelSerializer):
    exercise_set = ExerciseSerializer(read_only=True, many=True)

    class Meta:
        model = Workout
        fields = ('id', 'assigned_day', 'training_plan_id', 'exercise_set')

    training_plan_id = serializers.IntegerField()
