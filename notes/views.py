from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, DestroyAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .apps import NotesConfig
from .models import Note
from .serializers import NoteSerializer
from django.http import JsonResponse

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

# Create your views here.

app_name = NotesConfig.name


class Index(LoginRequiredMixin, TemplateView):
    template_name = 'notes/index.html'
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    

class GetNotes(ListAPIView):
    # queryset = Note.objects.order_by('-last_updated')
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user).order_by('-last_updated')


class SubmitNote(CreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UpdateNote(UpdateAPIView):
    serializer_class = NoteSerializer    
    queryset = Note.objects.all()


class DeleteNote(DestroyAPIView):
    serializer_class = NoteSerializer    
    queryset = Note.objects.all()


def get_user_id(request):
    user_id = request.user.id
    return JsonResponse({'user_id': user_id})