from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index.as_view(), name="notes"),
    path('get-notes/', views.GetNotes.as_view(), name="get-notes"),
    path('submit/', views.SubmitNote.as_view(), name='submit-note'),
    path('update/<int:pk>/', views.UpdateNote.as_view(), name='update-note'),
    path('delete/<int:pk>/', views.DeleteNote.as_view(), name='delete-note'),
    path('get-user-id/', views.get_user_id, name='get-user-id'),
]