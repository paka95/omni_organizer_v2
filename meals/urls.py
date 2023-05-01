from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index.as_view(), name='meals'),
    path('add-product/', views.AddProduct.as_view(), name='add-product'),
    path('add-meal/', views.AddMeal.as_view(), name='add-meal'),
    path('get-products/', views.GetProducts.as_view(), name='get-products'),
]