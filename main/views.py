from .forms import LoginFormTemplate, CustomUserCreationForm
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.contrib import messages



class Index(LoginRequiredMixin, TemplateView):
    template_name = 'main/homepage.html'


class UserProfile(LoginRequiredMixin, TemplateView):
    template_name = 'main/user-profile.html'


class CustomLoginView(LoginView):
    template_name = 'main/login.html'
    authentication_form = LoginFormTemplate

    def form_invalid(self, form):
        messages.error(self.request, 'Invalid username or password')
        return super().form_invalid(form)


class CustomRegisterView(CreateView):
    template_name = 'main/register.html'
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')

    def form_invalid(self, form):
        messages.error(self.request, 'Error in registration')
        return super().form_invalid(form)
