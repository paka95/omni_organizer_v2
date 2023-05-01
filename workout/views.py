from django.shortcuts import render
from .apps import WorkoutConfig

# Create your views here.

app_name = WorkoutConfig.name

def index(request):
    return render(request, 'workout/index.html')