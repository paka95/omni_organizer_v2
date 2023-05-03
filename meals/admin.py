from django.contrib import admin
from .models import Product, Meal


class MealAdmin(admin.ModelAdmin):
    list_display = ('product', 'meal_day', 'meal_type', 'weight', 'kcal')

    def kcal(self, obj):
        return obj.kcal

    kcal.short_description = 'Kcal'


admin.site.register(Product)
admin.site.register(Meal, MealAdmin)