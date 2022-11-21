from django.urls import path
from . import views

urlpatterns = [
    path('', views.client_workouts_list),
    path('<int:pk>/', views.client_workout_detail),
    path('all/', views.admin_workouts_list),
    path('all/<int:pk>/', views.admin_workout_detail),
]
