from django.test import TestCase, Client
from django.urls import reverse
from main.models import CustomUser
from .models import Note
import json

class NotesTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = CustomUser.objects.create_user(email='testuser@x.com', password='testpassword')


    def test_index_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('notes'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'notes/index.html')


    def test_get_notes_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('get-notes'))
        self.assertEqual(response.status_code, 200)


    def test_list_notes_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        Note.objects.create(title='Note 1', content='Content 1', user=self.user)
        Note.objects.create(title='Note 2', content='Content 2', user=self.user)

        response = self.client.get(reverse('get-notes'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        # reversed because notes are ordered by -date_created
        self.assertEqual(response.data[0]['content'], 'Content 2')
        self.assertEqual(response.data[1]['title'], 'Note 1')
        

    def test_submit_note_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        user_id = self.user.id
        data = {'title': '', 'content': '', 'user': user_id}
        response = self.client.post(reverse('submit-note'), data=data)
        self.assertEqual(response.status_code, 201)


    def test_submit_note_view_no_user(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {'title': '', 'content': ''}
        response = self.client.post(reverse('submit-note'), data=data)
        self.assertEqual(response.status_code, 400)


    def test_update_note_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        note = Note.objects.create(title='Test Note', content='This is a test note', user=self.user)
        data = {'title': 'Updated Note', 'content': 'This is the updated note'}
        response = self.client.patch(reverse('update-note', kwargs={'pk': note.pk}), json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_delete_note_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        note = Note.objects.create(title='Test Note', content='This is a test note', user=self.user)
        response = self.client.delete(reverse('delete-note', kwargs={'pk': note.pk}))
        self.assertEqual(response.status_code, 204)


    def test_get_user_id_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('get-user-id'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['user_id'], self.user.id)


    def test_get_notes_view_empty(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        Note.objects.all().delete()
        response = self.client.get(reverse('get-notes'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

