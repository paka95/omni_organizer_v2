from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index.as_view(), name='meals'),
    path('add-product/', views.AddProduct.as_view(), name='add-product'),
    path('add-meal/', views.AddGetMeal.as_view(), name='add-meal'),
    path('get-products/', views.GetProducts.as_view(), name='get-products'),
    path('delete/<int:pk>/', views.DeleteMeal.as_view(), name='delete-meal'),
    path('update/<int:pk>/', views.UpdateMeal.as_view(), name='update-meal'),
    path('get-user-id/', views.get_user_id, name='get-user-id'),
]