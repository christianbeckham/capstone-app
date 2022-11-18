from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_client_checkins, name='client_checkins'),
    path('all/', views.get_all_checkins, name='all_checkins'),
    path('<int:pk>/', views.checkin_detail, name='checkin_detail'),
]
