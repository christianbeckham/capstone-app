from django.urls import path
from . import views

urlpatterns = [
    path('', views.requests_list),
    path('<int:pk>/', views.requests_detail),
    path('all/', views.admin_requests_list),
]
