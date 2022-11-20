from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_exercises_list),
    path('<int:pk>/', views.exercise_detail, name="api_exercises"),
]
