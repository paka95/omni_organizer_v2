from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.response import Response
from django.db.models import Sum
from .apps import FinancesConfig
from django.views import View
import datetime
from .models import Expense
from .serializers import ExpenseSerializer
from itertools import zip_longest


app_name = FinancesConfig.name

class Index(View):
    template_name = 'finances/index.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    


class GetExpenses(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        specified_date_obj = datetime.datetime.strptime(data["specified_date"][:10], '%Y-%m-%d')
        expenses = Expense.objects.order_by('-date_created').filter(date_created__month=specified_date_obj.month)

        total_amount = expenses.aggregate(Sum('amount'))['amount__sum']
        if total_amount:
            total_amount = round(total_amount, 2)
        expenses_data = ExpenseSerializer(expenses, many=True).data
        return Response({'expenses': expenses_data, 'total_amount': total_amount})
    


class Preview(View):
    template_name = 'finances/preview.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    


class GetPreview(APIView):
    def post(self, request, *args, **kwargs):
        expense = {
            'food': {'expenses': [], 'total': 0},
            'transport': {'expenses': [], 'total': 0},
            'bills': {'expenses': [], 'total': 0},
            'fees': {'expenses': [], 'total': 0},
            'misc': {'expenses': [], 'total': 0},
            'title': [],
            'date_created': []
        }
        data = request.data
        specified_date_obj = datetime.datetime.strptime(data["specified_date"][:10], '%Y-%m-%d')
        expenses = Expense.objects.order_by('-date_created').filter(date_created__month=specified_date_obj.month)
        total_amount = expenses.aggregate(Sum('amount'))['amount__sum']
        if total_amount:
            total_amount = round(total_amount, 2)
        expenses_data = ExpenseSerializer(expenses, many=True).data
        for item in expenses_data:
            if item['tag'] == 'food':
                date_obj = datetime.datetime.strptime(item['date_created'], '%Y-%m-%dT%H:%M:%SZ')
                formatted_date_str = date_obj.strftime('%d-%m-%Y')
                expense['food']['expenses'].append((item['amount'], f"{item['title']}, {formatted_date_str}"))
                expense['food']['total'] += item['amount']
            elif item['tag'] == 'transport':
                date_obj = datetime.datetime.strptime(item['date_created'], '%Y-%m-%dT%H:%M:%SZ')
                formatted_date_str = date_obj.strftime('%d-%m-%Y')
                expense['transport']['expenses'].append((item['amount'], f"{item['title']}, {formatted_date_str}"))
                expense['transport']['total'] += item['amount']
            elif item['tag'] == 'bills':
                date_obj = datetime.datetime.strptime(item['date_created'], '%Y-%m-%dT%H:%M:%SZ')
                formatted_date_str = date_obj.strftime('%d-%m-%Y')
                expense['bills']['expenses'].append((item['amount'], f"{item['title']}, {formatted_date_str}"))
                expense['bills']['total'] += item['amount']
            elif item['tag'] == 'fees':
                date_obj = datetime.datetime.strptime(item['date_created'], '%Y-%m-%dT%H:%M:%SZ')
                formatted_date_str = date_obj.strftime('%d-%m-%Y')
                expense['fees']['expenses'].append((item['amount'], f"{item['title']}, {formatted_date_str}"))
                expense['fees']['total'] += item['amount']
            elif item['tag'] == 'misc':
                date_obj = datetime.datetime.strptime(item['date_created'], '%Y-%m-%dT%H:%M:%SZ')
                formatted_date_str = date_obj.strftime('%d-%m-%Y')
                expense['misc']['expenses'].append((item['amount'], f"{item['title']}, {formatted_date_str}"))
                expense['misc']['total'] += item['amount']

        expenses_totals = {
            'food': expense['food']['total'],
            'transport': expense['transport']['total'],
            'bills': expense['bills']['total'],
            'fees': expense['fees']['total'],
            'misc': expense['misc']['total'],
        }
        expense_rows = zip_longest(
            expense['food']['expenses'], 
            expense['transport']['expenses'], 
            expense['bills']['expenses'], 
            expense['fees']['expenses'], 
            expense['misc']['expenses'],
            fillvalue=""
            )
        expenses_list = []
        for expense_row in expense_rows:
            expenses_list.append(expense_row)
        return Response({'expenses_list': expenses_list, 'expenses_totals': expenses_totals, 'total_amount': total_amount})
    


class SubmitExpense(CreateAPIView):
    serializer_class = ExpenseSerializer



class DeleteExpense(DestroyAPIView):
    serializer_class = ExpenseSerializer    
    queryset = Expense.objects.all()



class UpdateExpense(UpdateAPIView):
    serializer_class = ExpenseSerializer    
    queryset = Expense.objects.all()