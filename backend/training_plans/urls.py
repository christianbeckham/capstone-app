from django.urls import path
from . import views

urlpatterns = [
    path('', views.client_training_plan_list),
    path('all/', views.admin_training_plans_list),
    path('<int:pk>/', views.admin_training_plan_detail),
]
