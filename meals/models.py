from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Product(models.Model):
    TYPE_CHOICES = [
        ('meat', 'Meat'),
        ('dairy', 'Dairy'),
        ('eggs', 'Eggs'),
        ('fruits', 'Fruits'),
        ('vegetables', 'Vegetables'),
        ('pasta', 'Pasta/Grains'),
        ('drinks', 'Drinks'),
        ('fats', 'Fats'),
        ('breadstuff', 'Breadstuff'),
        ('nuts', 'Nuts'),
        ('fish', 'Fish'),
        ('mushrooms', 'Mushrooms'),
        ('misc', 'Misc'),
    ]

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    proteins = models.FloatField(verbose_name="Proteins per 100g")
    carbs = models.FloatField(verbose_name="Carbs per 100g")
    fats = models.FloatField(verbose_name="Fats per 100g")
    kcal = models.FloatField(verbose_name="Kcal per 100g")

    def __str__(self):
        return f'{self.name} ({self.type})'
    


class Meal(models.Model):
    TYPE_CHOICES = [
        ('breakfast', 'Breakfast'),
        ('second_breakfast', 'Second Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('supper', 'Supper'),
        ('misc', 'Misc')
    ]

    DAY_CHOICES = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday')
    ]

    meal_day = models.CharField(max_length=50, choices=DAY_CHOICES, default=None)
    meal_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, default = None)
    weight = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    @property
    def kcal(self):
        return self.product.kcal * self.weight / 100
    
    @property
    def proteins(self):
        return self.product.proteins * self.weight / 100
    
    @property
    def carbs(self):
        return self.product.carbs * self.weight / 100
    
    @property
    def fats(self):
        return self.product.fats * self.weight / 100

    def __str__(self):
        return f"{self.product.name} ({self.meal_day}, {self.meal_type}, {self.weight}g, {self.weight * self.product.kcal / 100} kcal)"
    

