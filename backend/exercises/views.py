from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Exercise
from .serializers import ExerciseSerializer
import requests
import os

from workouts.models import Workout

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAdminUser])
def api_exercises_list(request):
    if request.method == 'GET':
        url = 'https://exercisedb.p.rapidapi.com/exercises'
        headers = {
            'X-RapidAPI-Key': os.environ.get("EXERCISE_DB_RAPID_API_KEY"),
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
        response = requests.get(url=url, headers=headers)
        return Response(response.json(), status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def api_exercise_detail(request, pk):
    if request.method == 'GET':
        url = f'https://exercisedb.p.rapidapi.com/exercises/exercise/{pk}'
        headers = {
            'X-RapidAPI-Key': os.environ.get("EXERCISE_DB_RAPID_API_KEY"),
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
        response = requests.get(url=url, headers=headers)
        return Response(response.json(), status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def exercise_list(request):
    if request.method == 'POST':
        workout_id = request.data.pop('workouts_id')
        serializer = ExerciseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        new_exercise = get_object_or_404(
            Exercise, pk=serializer.data.get('id'))
        if new_exercise is not None:
            workout = get_object_or_404(Workout, id=workout_id)
            new_exercise.workouts.add(workout)
            new_exercise = get_object_or_404(
                Exercise, pk=serializer.data.get('id'))
            serializer = ExerciseSerializer(new_exercise)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def exercise_detail(request, pk):
    exercise = get_object_or_404(Exercise, pk=pk)

    if request.method == 'GET':
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT' and request.user.is_staff:
        serializer = ExerciseSerializer(exercise, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE' and request.user.is_staff:
        exercise.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)
