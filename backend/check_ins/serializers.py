from rest_framework import serializers
from .models import CheckIn
from checkin_images.serializers import CheckInImageSerializer


class CheckInSerializer(serializers.ModelSerializer):
    checkinimage_set = CheckInImageSerializer(many=True, read_only=True)
    class Meta:
        model = CheckIn
        fields = ('user_id', 'id', 'weight', 'feedback', 'created_date', 'checkinimage_set')
