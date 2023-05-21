from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm
from django import forms

from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs={'class': 'register-field', 'placeholder': 'Enter email', 'autocomplete': False}
        self.fields['password1'].widget.attrs={'class': 'register-field', 'placeholder': 'Enter password'}
        self.fields['password2'].widget.attrs={'class': 'register-field', 'placeholder': 'Confirm password'}

        self.fields['email'].label = False 
        self.fields['password1'].label = False
        self.fields['password2'].label = False
        self.fields['password1'].help_text = None
        self.fields['password2'].help_text = None


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('email',)


# class LoginForm(forms.ModelForm):
#     password = forms.CharField(widget=forms.PasswordInput())
#     class Meta:
#         model = CustomUser
#         fields =('email',)

#     def __init__(self, *args, **kwargs):
#         super(LoginForm, self).__init__(*args, **kwargs)
#         self.fields['email'].widget.attrs={'class': 'login-field', 'placeholder': 'Enter email', 'autocomplete': False}
#         self.fields['password'].widget.attrs={'class': 'password-field', 'placeholder': 'Enter password'}



# class RegistrationFormTemplate(UserCreationForm):
#     class Meta(UserCreationForm.Meta):
#         model = CustomUser
#         fields = ('email', 'password1', 'password2')


class LoginFormTemplate(AuthenticationForm):
    class Meta:
        model = CustomUser
        fields = ('email',)

    def __init__(self, *args, **kwargs):
        super(LoginFormTemplate, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs={'class': 'login-field', 'placeholder': 'Enter email', 'autocomplete': False}  # Apply class to the username/email field
        self.fields['password'].widget.attrs={'class': 'login-field', 'placeholder': 'Enter password', 'autocomplete': False}

        self.fields['username'].label = False 
        self.fields['password'].label = False

