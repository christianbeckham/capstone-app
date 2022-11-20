from django.urls import path
from . import views

urlpatterns = [
    path('', views.client_checkins_list),
    path('all/', views.admin_checkins_list),
    path('<int:pk>/', views.checkin_detail),
]
