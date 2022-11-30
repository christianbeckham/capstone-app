from rest_framework import serializers
from .models import CheckIn
from checkin_images.models import CheckInImage
from authentication.models import User


class ReadOnlyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'full_name', 'first_name', 'last_name')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInImage
        fields = ('id', 'title', 'image', 'uploaded_date')


class CheckInSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True,
                             source='checkinimage_set')
    user = ReadOnlyUserSerializer(many=False, read_only=True)

    class Meta:
        model = CheckIn
        fields = ('user', 'id', 'weight',
                  'weekly_review', 'trainer_feedback', 'created_date', 'images')
