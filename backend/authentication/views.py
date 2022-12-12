from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, ClientSerializer


# Create your views here.
User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_client_list(request):
    clients = get_list_or_404(User, is_client=True)

    if request.method == 'GET':
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAdminUser])
def admin_client_detail(request, pk):
    client = get_object_or_404(User, pk=pk, is_client=True)

    if request.method == 'GET':
        serializer = ClientSerializer(client)
        return Response(serializer.data)
    elif request.method == 'PATCH':
        serializer = ClientSerializer(client, request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_client_totals(request):
    if request.method == 'GET':
        results = {'total': 0, 'active': 0, 'inactive': 0}
        results['total'] = User.objects.filter(is_client=True).count()
        results['active'] = User.objects.filter(
            is_client=True).filter(is_active=True).count()
        results['inactive'] = User.objects.filter(
            is_client=True).filter(is_active=False).count()
        return Response(results)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    user = get_object_or_404(User, id=request.user.id)

    if request.method == 'GET':
        serializer = ClientSerializer(user)
        return Response(serializer.data)
