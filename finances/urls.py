from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index.as_view(), name='finances'),
    path('get-expenses/', views.GetExpenses.as_view(), name='get-expenses'),
    path('submit/', views.SubmitExpense.as_view(), name='submit-expense'),
    path('delete/<int:pk>/', views.DeleteExpense.as_view(), name='delete-expense'),
    path('update/<int:pk>/', views.UpdateExpense.as_view(), name='update-expense'),
    path('preview/', views.Preview.as_view(), name='preview'),
    path('preview/get-preview/', views.GetPreview.as_view(), name='get-preview'),
    path('get-user-id/', views.get_user_id, name='get-user-id'),
]