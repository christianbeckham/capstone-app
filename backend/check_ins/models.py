from django.db import models
from authentication.models import User

# Create your models here.


class CheckIn(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=4, decimal_places=1)
    feedback = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
