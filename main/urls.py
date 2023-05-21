from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="homepage"),
    path('profile/', views.user_profile, name="user-profile"),
    path('login/', views.CustomLoginView.as_view(), name="login"),
    path('register/', views.CustomRegisterView.as_view(), name="register"),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
]