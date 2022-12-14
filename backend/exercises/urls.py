from django.urls import path
from . import views

urlpatterns = [
    path('', views.admin_exercise_list),
    path('<int:pk>/', views.exercise_detail),
    path('db/', views.api_exercises_list),
]
