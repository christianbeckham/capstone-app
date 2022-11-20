from rest_framework import serializers
from .models import CheckIn


class CheckInSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIn
        fields = ('user_id', 'id', 'weight', 'feedback', 'created_date', 'checkinimage_set')
