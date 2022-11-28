from rest_framework import serializers
from .models import CheckIn
from checkin_images.models import CheckInImage


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInImage
        fields = ('id', 'title', 'image', 'uploaded_date')


class CheckInSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True,
                             source='checkinimage_set')

    class Meta:
        model = CheckIn
        fields = ('user_id', 'id', 'weight',
                  'feedback', 'created_date', 'images')
