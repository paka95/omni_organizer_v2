from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.messages import get_messages

User = get_user_model()


class MainViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(email='testuser@x.com', password='testpassword')


    def test_index_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('homepage'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/homepage.html')


    def test_user_profile_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('user-profile'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/user-profile.html')


    def test_login_view(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/login.html')


    def test_login_view_invalid_credentials(self):
        data = {'username': 'invaliduser', 'password': 'invalidpassword'}
        response = self.client.post(reverse('login'), data=data)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/login.html')
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(len(messages), 1)
        self.assertEqual(str(messages[0]), 'Invalid username or password')


    def test_register_view(self):
        data = {'email': 'newuser@x.com', 'password1': 'newpassword', 'password2': 'newpassword'}
        response = self.client.post(reverse('register'), data=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.count(), 1)


    def test_register_view_invalid_form(self):
        data = {'email': 'newuser@x.com', 'password1': 'newpassword', 'password2': 'mismatchedpassword'}
        response = self.client.post(reverse('register'), data=data)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/register.html')
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(len(messages), 1)
        self.assertEqual(str(messages[0]), 'Error in registration')