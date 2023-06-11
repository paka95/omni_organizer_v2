from django.test import TestCase, Client
from django.urls import reverse
from main.models import CustomUser
from .models import Product, Meal


class MealsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = CustomUser.objects.create_user(email='testuser@x.com', password='testpassword')


    def test_index_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('meals'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'meals/index.html')


    def test_get_products_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('get-products'))
        self.assertEqual(response.status_code, 200)


    def test_add_product_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {'name': 'Test Product', 'type': 'misc', 'proteins': 100, 'carbs': 100, 'fats': 100, 'kcal': 50}
        response = self.client.post(reverse('add-product'), data=data)
        self.assertEqual(response.status_code, 201)


    def test_add_product_view_empty_name(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {'name': '', 'type': 'misc', 'proteins': 100, 'carbs': 100, 'fats': 100, 'kcal': 50}
        response = self.client.post(reverse('add-product'), data=data)
        self.assertEqual(response.status_code, 400)


    def test_add_product_view_empty_type(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {'name': 'Test Product', 'type': '', 'proteins': 100, 'carbs': 100, 'fats': 100, 'kcal': 50}
        response = self.client.post(reverse('add-product'), data=data)
        self.assertEqual(response.status_code, 400)


    def test_add_product_view_empty_nutrients(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        data = {'name': 'Test Product', 'type': 'misc', 'proteins': '', 'carbs': '', 'fats': '', 'kcal': ''}
        response = self.client.post(reverse('add-product'), data=data)
        self.assertEqual(response.status_code, 400)


    def test_add_get_meal_view(self):
        self.product = Product.objects.create(name= "Test Product", type= "dairy", proteins= 100, carbs= 100, fats= 100, kcal= 50)
        self.client.login(email='testuser@x.com', password='testpassword')
        user_id = self.user.id
        data = {'name': 'Test Meal', 'product': self.product.id, 'meal_type': 'breakfast', 'meal_day': 'monday', 'user': user_id, 'weight': 100}
        response = self.client.post(reverse('add-meal'), data=data)
        self.assertEqual(response.status_code, 201)


    def test_add_get_meal_view_empty_weight(self):
        self.product = Product.objects.create(name= "Test Product 2", type= "eggs", proteins= 50, carbs= 50, fats= 20, kcal= 50)
        self.client.login(email='testuser@x.com', password='testpassword')
        user_id = self.user.id
        data = {'name': 'Test Meal', 'product': self.product.id, 'meal_type': 'breakfast', 'meal_day': 'monday', 'user': user_id, 'weight': ''}
        response = self.client.post(reverse('add-meal'), data=data)
        self.assertEqual(response.status_code, 400)


    def test_delete_meal_view(self):
        self.product = Product.objects.create(name= "Test Product 3", type= "meat", proteins= 150, carbs= 150, fats= 70, kcal= 200)
        self.client.login(email='testuser@x.com', password='testpassword')
        meal = Meal.objects.create(product = self.product, meal_type='breakfast', meal_day='monday', user=self.user, weight = 200)
        response = self.client.delete(reverse('delete-meal', kwargs={'pk': meal.pk}))
        self.assertEqual(response.status_code, 204)


    def test_get_user_id_view(self):
        self.client.login(email='testuser@x.com', password='testpassword')
        response = self.client.get(reverse('get-user-id'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['user_id'], self.user.id)