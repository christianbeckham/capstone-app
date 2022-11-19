from rest_framework import serializers
from .models import ClientRequest


class ClientRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientRequest
        fields = ('user_id', 'id', 'type', 'description', 'created_date')
