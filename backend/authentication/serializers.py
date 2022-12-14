from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User
from training_plans.serializers import TrainingPlanSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # for any additional fields you'd like to add to the JWT sent back in response
        # add below using the token["field name"] = user.name_of_property
        # token["is_student"] = user.is_student

        token["username"] = user.username
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["is_admin"] = user.is_staff
        token["is_client"] = user.is_client

        return token


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        # If added new columns through the User model, add them in the fields
        # list as seen below
        fields = ('username', 'password', 'email',
                  'first_name', 'last_name', 'is_client')

    def create(self, validated_data):

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],

            # If added new columns through the User model, add them in this
            # create method. Example below:

            # is_client=validated_data['is_client']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class ClientSerializer(serializers.ModelSerializer):
    training_plan = TrainingPlanSerializer(read_only=True)
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name',
                  'last_name', 'full_name', 'date_joined', 'training_plan', 'is_client', 'is_active')
