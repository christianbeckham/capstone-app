from rest_framework import serializers
from .models import ClientRequest

from authentication.models import User


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'first_name', 'last_name', 'full_name')


class ClientRequestSerializer(serializers.ModelSerializer):
    user = ClientSerializer(read_only=True)
    status_text = serializers.ReadOnlyField()

    class Meta:
        model = ClientRequest
        fields = ('id', 'type', 'description', 'status',
                  'response', 'created_date', 'user', 'status_text')
