from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Workout
from .serializers import WorkoutSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def client_workouts_list(request):
    if request.method == 'GET':
        workouts = get_list_or_404(Workout, training_plan_id=request.data.get('training_plan_id'))
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def client_workout_detail(request, pk):
    workout = get_object_or_404(Workout, pk=pk)

    if request.method == 'GET':
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAdminUser])
def admin_workouts_list(request):
    if request.method == 'GET':
        workouts = Workout.objects.all()
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if request.data.get('exercises') is not None:
            exercises = request.data.pop('exercises')

            if len(exercises) > 0:
                serializer = WorkoutSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                w = get_object_or_404(Workout, id=serializer.data.get('id'))

                for exercise in exercises:
                    w.exercise_set.create(**exercise)

                serializer = WorkoutSerializer(w)
        else:
            serializer = WorkoutSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAdminUser])
def admin_workout_detail(request, pk):
    workout = get_object_or_404(Workout, pk=pk)

    if request.method == 'GET':
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = WorkoutSerializer(workout, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        workout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_400_BAD_REQUEST)
