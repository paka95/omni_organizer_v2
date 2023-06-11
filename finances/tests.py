from django.test import TestCase, Client
from django.urls import reverse
from main.models import CustomUser
from .models import Expense
from datetime import datetime
import json

class FinancesTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = CustomUser.objects.create_user(email='testuser@x.com', password='testpassword')
        self.expense = Expense.objects.create(title='Test Expense', amount=10.0, tag='food', user=self.user)


    def test_index_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('finances'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'finances/index.html')


    def test_get_expenses_api_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {
            'specified_date': '2023-06-01'
        }
        response = self.client.post(reverse('get-expenses'), data = data)
        self.assertEqual(response.status_code, 200)


    def test_preview_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('preview'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'finances/preview.html')


    def test_submit_expense_api_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        user_id = self.user.id
        current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        data = {'title': 'New Expense', 'amount': 15.0, 'tag': 'misc', 'user': user_id, 'date_created': current_date}
        response = self.client.post(reverse('submit-expense'), data = data)
        self.assertEqual(response.status_code, 201)


    def test_submit_expense_api_view_empty_field(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        user_id = self.user.id
        current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        data = {'title': '', 'amount': 15.0, 'tag': 'misc', 'user': user_id, 'date_created': current_date}
        response = self.client.post(reverse('submit-expense'), data = data)
        self.assertEqual(response.status_code, 400)


    def test_submit_expense_api_view_wrong_tag(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        user_id = self.user.id
        current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        data = {'title': 'New Expense', 'amount': 15.0, 'tag': 'something_else', 'user': user_id, 'date_created': current_date}
        response = self.client.post(reverse('submit-expense'), data = data)
        self.assertEqual(response.status_code, 400)


    def test_delete_expense_api_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.delete(reverse('delete-expense', kwargs={'pk': self.expense.pk}))
        self.assertEqual(response.status_code, 204)


    def test_update_expense_api_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {'title': 'Updated Expense', 'amount': 20.0, 'tag': 'transport'}
        response = self.client.patch(reverse('update-expense', kwargs={'pk': self.expense.pk}), json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_update_expense_api_view_empty_field(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {'title': '', 'amount': 20.0, 'tag': 'transport'}
        response = self.client.patch(reverse('update-expense', kwargs={'pk': self.expense.pk}), json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)


    def test_update_expense_api_view_wrong_tag(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {'title': '', 'amount': 20.0, 'tag': 'something_else'}
        response = self.client.patch(reverse('update-expense', kwargs={'pk': self.expense.pk}), json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)


    def test_get_user_id_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('get-user-id'))
        self.assertEqual(response.status_code, 200)





