from rest_framework import serializers
from .models import CheckInImage


class CheckInImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInImage
        fields = ('check_in', 'title', 'image', 'check_in_id')

    check_in_id = serializers.IntegerField(write_only=True)
