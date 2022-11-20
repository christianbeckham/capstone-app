from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import CheckIn
from .serializers import CheckInSerializer
from checkin_images.serializers import CheckInImageSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_checkins_list(request):
    checkins = CheckIn.objects.all()
    serializer = CheckInSerializer(checkins, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def client_checkins_list(request):
    if request.method == 'GET':
        client_checkins = get_list_or_404(CheckIn, user_id=request.user.id)
        serializer = CheckInSerializer(client_checkins, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CheckInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        if request.FILES:
            images = dict((request.FILES).lists()).get('images', None)
            if images:
                for image in images:
                    image_data = {}
                    image_data['check_in_id'] = serializer.data.get('id')
                    image_data['title'] = f'{request.user.first_name}-{request.user.last_name}'
                    image_data['image'] = image
                    image_serializer = CheckInImageSerializer(data=image_data)
                    image_serializer.is_valid(raise_exception=True)
                    image_serializer.save()
            new_checkin = get_object_or_404(CheckIn, pk=serializer.data.get('id'), user_id=request.user.id)
            serializer = CheckInSerializer(new_checkin)
        
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
