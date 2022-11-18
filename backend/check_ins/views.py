from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import CheckIn
from .serializers import CheckInSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_checkins(request):
    checkins = CheckIn.objects.all()
    serializer = CheckInSerializer(checkins, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_client_checkins(request):

    if request.method == 'GET':
        client_checkins = get_list_or_404(CheckIn, user_id=request.user.id)
        serializer = CheckInSerializer(client_checkins, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CheckInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def checkin_detail(request, pk):
    checkin = get_object_or_404(CheckIn, pk=pk, user_id=request.user.id)

    if request.method == 'GET':
        serializer = CheckInSerializer(checkin)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = CheckInSerializer(checkin, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        checkin.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
