from django.shortcuts import render
from .forms import LoginFormTemplate, CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView




@login_required
def index(request):
    return render(request, 'main/homepage.html')


@login_required
def user_profile(request):
    return render(request, 'main/user-profile.html')


class CustomLoginView(LoginView):
    template_name = 'main/login.html'
    authentication_form = LoginFormTemplate


class CustomRegisterView(CreateView):
    template_name = 'main/register.html'
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')


