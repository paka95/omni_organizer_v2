from rest_framework import serializers
from .models import Product, Meal

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('__all__')


class MealSerializer(serializers.ModelSerializer):
    meal_kcal = serializers.ReadOnlyField(source='kcal')
    meal_proteins = serializers.ReadOnlyField(source='proteins')
    meal_carbs = serializers.ReadOnlyField(source='carbs')
    meal_fats = serializers.ReadOnlyField(source='fats')
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = Meal
        fields = ('__all__')