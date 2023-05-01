from rest_framework import serializers
from .models import Product, Meal

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('__all__')


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ('__all__')