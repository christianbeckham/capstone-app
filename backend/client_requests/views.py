from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import ClientRequest
from .serializers import ClientRequestSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_requests_list(request):
    if request.method == 'GET':
        requests = ClientRequest.objects.all()
        serializer = ClientRequestSerializer(requests, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def requests_list(request):
    if request.method == 'GET':
        requests = get_list_or_404(ClientRequest, user_id=request.user.id)
        serializer = ClientRequestSerializer(requests, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ClientRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def requests_detail(request, pk):
    req = get_object_or_404(ClientRequest, pk=pk, user_id=request.user.id)

    if request.method == 'GET':
        serializer = ClientRequestSerializer(req)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = ClientRequestSerializer(req, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        req.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
