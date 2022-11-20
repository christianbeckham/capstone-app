from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Exercise
from .serializers import ExerciseSerializer
import requests
import os

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
@permission_classes([IsAuthenticated])
def exercise_detail(request, pk):
    exercise = get_object_or_404(Exercise, pk=pk)

    if request.method == 'GET':
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data, status=status.HTTP_200_OK)
