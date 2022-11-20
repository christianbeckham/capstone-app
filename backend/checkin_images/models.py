from django.db import models
from check_ins.models import CheckIn
import os

# Create your models here.


class CheckInImage(models.Model):

    def set_upload_path(instance, filename):
        user = instance.check_in.user
        created_date = instance.check_in.created_date.strftime('%Y-%m')
        return os.path.join(f"clients/{user.first_name}-{user.last_name}/{created_date}/{filename}")

    check_in = models.ForeignKey(CheckIn, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to=set_upload_path, blank=True, null=True)
    uploaded_date = models.DateTimeField(auto_now_add=True)
