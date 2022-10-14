from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path('',views.getData),
    path('user/register/',views.register, name='user_register'),
    path('addrecipe/',views.addrecipe,name='add_recipe'),
    path('getuserdashboard/',views.get_user_dashboard,name='get_user_dashboard'),
    path('recipedelete/<str:id>',views.recipe_delete,name='recipe_delete'),
    path('getusername/<str:email>',views.getUsername,name='get_username'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('sum',views.sum,name='get_sum'),
]
