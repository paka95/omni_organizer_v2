from django.shortcuts import render
from .forms import LoginFormTemplate, CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView



class Index(LoginRequiredMixin, TemplateView):
    template_name = 'main/homepage.html'


class UserProfile(LoginRequiredMixin, TemplateView):
    template_name = 'main/user-profile.html'


class CustomLoginView(LoginView):
    template_name = 'main/login.html'
    authentication_form = LoginFormTemplate


class CustomRegisterView(CreateView):
    template_name = 'main/register.html'
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')


