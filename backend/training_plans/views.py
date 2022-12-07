from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import TrainingPlan
from .serializers import TrainingPlanSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def client_training_plan_list(request):
    if request.method == 'GET':
        client_training_plan = get_list_or_404(
            TrainingPlan, user_id=request.user.id)
        serializer = TrainingPlanSerializer(client_training_plan, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAdminUser])
def admin_training_plans_list(request):
    if request.method == 'GET':
        training_plans = TrainingPlan.objects.all()
        serializer = TrainingPlanSerializer(training_plans, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TrainingPlanSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAdminUser])
def admin_training_plan_detail(request, pk):
    training_plan = get_object_or_404(TrainingPlan, pk=pk)

    if request.method == 'GET':
        serializer = TrainingPlanSerializer(training_plan)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        serializer = TrainingPlanSerializer(
            training_plan, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        training_plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
