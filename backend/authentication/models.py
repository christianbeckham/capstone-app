from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''

    # Remove the pass if you add fields as shown below
    # pass

    # Example (note import of models above that is commented out)
    # this will add a column to the user table
    is_client = models.BooleanField('client status', default=True)

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'
