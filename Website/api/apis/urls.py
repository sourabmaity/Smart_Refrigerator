from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)

urlpatterns = [
    path('',views.getData),
    path('user/register/',views.register, name='user_register'),
    path('addrecipe/',views.addrecipe,name='add_recipe'),
    path('getusername/<str:email>',views.getUsername,name='get_username'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
