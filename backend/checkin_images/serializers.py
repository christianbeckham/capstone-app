from rest_framework import serializers
from .models import CheckInImage
from check_ins.serializers import CheckInSerializer


class CheckInImageSerializer(serializers.ModelSerializer):
    check_in = CheckInSerializer(many=False, read_only=True)
    
    class Meta:
        model = CheckInImage
        fields = ('check_in', 'title', 'image', 'check_in_id')

    check_in_id = serializers.IntegerField(write_only=True)
