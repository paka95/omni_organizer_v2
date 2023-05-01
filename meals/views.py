from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, ListCreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from .apps import MealsConfig
from django.views import View
import datetime
from .models import Product, Meal
from .serializers import ProductSerializer, MealSerializer
from itertools import zip_longest


app_name = MealsConfig.name

class Index(View):
    template_name = 'meals/index.html'

    def get(self, request, *args, **kwargs):
        product_types = Product.TYPE_CHOICES
        meal_types = Meal.TYPE_CHOICES
        meal_days = Meal.DAY_CHOICES
        context = {
            'product_types': product_types,
            'meal_types': meal_types,
            'meal_days': meal_days
        }
        return render(request, self.template_name, context)
    

        # type = 'dairy'
        # products = Product.objects.filter(type=type)

        # print(products)
    
class GetProducts(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        product_type = self.request.query_params.get('type', None)
        if product_type is not None:
            queryset = queryset.filter(type=product_type)
        return queryset


class AddProduct(CreateAPIView):
    serializer_class = ProductSerializer


class AddMeal(ListCreateAPIView):
    serializer_class = MealSerializer