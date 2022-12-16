from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('user_validity/', views.user_validity_check),
    path('clients/', views.admin_client_list),
    path('clients/<int:pk>/', views.admin_client_detail),
    path('clients/total/', views.admin_client_totals),
    path('me/', views.user_detail),
]
