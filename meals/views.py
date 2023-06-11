from django.shortcuts import render
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, ListCreateAPIView, ListAPIView
from .apps import MealsConfig
from django.views import View
from .models import Product, Meal
from .serializers import ProductSerializer, MealSerializer
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse


app_name = MealsConfig.name


class Index(LoginRequiredMixin, View):
    template_name = 'meals/index.html'

    def get(self, request, *args, **kwargs):
        # getting options for select inputs in index.html
        product_types = Product.TYPE_CHOICES
        meal_types = Meal.TYPE_CHOICES
        meal_days = Meal.DAY_CHOICES
        context = {
            'product_types': product_types,
            'meal_types': meal_types,
            'meal_days': meal_days
        }
        return render(request, self.template_name, context)
    
    
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


class AddGetMeal(ListCreateAPIView):
    serializer_class = MealSerializer

    def get_queryset(self):
        user = self.request.user
        return Meal.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DeleteMeal(DestroyAPIView):
    serializer_class = MealSerializer    
    queryset = Meal.objects.all()


class UpdateMeal(UpdateAPIView):
    serializer_class = MealSerializer    
    queryset = Meal.objects.all()


def get_user_id(request):
    user_id = request.user.id
    return JsonResponse({'user_id': user_id})
