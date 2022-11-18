from rest_framework import serializers
from .models import Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('workouts_id', 'id', 'name', 'sets', 'reps',
                  'rest_time', 'time_interval')
