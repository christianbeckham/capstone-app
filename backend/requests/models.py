from django.db import models
from authentication.models import User

# Create your models here.


class Request(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
