from django.urls import path
from . import views

urlpatterns = [
    path('', views.exercise_list),
    path('<int:pk>/', views.exercise_detail),
    path('all/', views.api_exercises_list),
    path('all/<int:pk>/', views.api_exercise_detail),
]
