from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, DestroyAPIView, CreateAPIView, UpdateAPIView
from .apps import NotesConfig
from .models import Note
from .serializers import NoteSerializer

# Create your views here.

app_name = NotesConfig.name


class Index(View):
    template_name = 'notes/index.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    

class GetNotes(ListAPIView):
    queryset = Note.objects.order_by('-last_updated')
    serializer_class = NoteSerializer


class SubmitNote(CreateAPIView):
    serializer_class = NoteSerializer


class UpdateNote(UpdateAPIView):
    serializer_class = NoteSerializer    
    queryset = Note.objects.all()


class DeleteNote(DestroyAPIView):
    serializer_class = NoteSerializer    
    queryset = Note.objects.all()