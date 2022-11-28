from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import ClientRequest
from .serializers import ClientRequestSerializer

from django.core.mail import send_mail
import os
from datetime import datetime

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_requests_list(request):
    if request.method == 'GET':
        requests = ClientRequest.objects.all()
        serializer = ClientRequestSerializer(requests, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE'])
@permission_classes([IsAdminUser])
def admin_requests_detail(request, pk):
    req = get_object_or_404(ClientRequest, pk=pk)

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

        cr_date = serializer.data.get("created_date")
        cr_date_converted = datetime.strptime(
            cr_date, "%Y-%m-%dT%H:%M:%S.%f%z")
        cr_date_formatted = cr_date_converted.strftime('%x')

        subject = f'New request from {request.user.first_name} {request.user.last_name}'
        message = f'Date: {cr_date_formatted}'
        message += f'\n\nType: {serializer.data.get("type")}'
        message += f'\n\nMessage: {serializer.data.get("description")}'
        email_from = os.environ.get("EMAIL_HOST_USER")
        email_to = [os.environ.get("EMAIL_ADMIN_USER"), ]
        send_mail(subject, message, email_from, email_to, False)

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
