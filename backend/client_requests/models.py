from django.db import models
from authentication.models import User

# Create your models here.


class ClientRequest(models.Model):
    class StatusChoice(models.IntegerChoices):
        OPEN = 1
        CLOSED = 0

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    status = models.IntegerField(
        choices=StatusChoice.choices, default=StatusChoice.OPEN)
    response = models.CharField(max_length=255, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    @property
    def status_text(self):
        return self.StatusChoice(self.status).name.lower()
