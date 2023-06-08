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
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.http import JsonResponse


app_name = FinancesConfig.name


class Index(LoginRequiredMixin, TemplateView):
    template_name = 'finances/index.html'
    

class GetExpenses(APIView):
    def post(self, request, *args, **kwargs):
        # data is an object holding specifiedDate from build-list.js 
        data = request.data
        user = self.request.user
        # it parses the date and cuts the time portion off
        specified_date_obj = datetime.datetime.strptime(data["specified_date"][:10], '%Y-%m-%d')
        expenses = Expense.objects.order_by('-date_created').filter(date_created__month=specified_date_obj.month, user=user)

        # summing up all the expenses together
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
        # data is an object holding specifiedDate from build-preview.js 
        data = request.data
        user = self.request.user
        # it parses the date and cuts the time portion off
        specified_date_obj = datetime.datetime.strptime(data["specified_date"][:10], '%Y-%m-%d')
        expenses = Expense.objects.order_by('-date_created').filter(date_created__month=specified_date_obj.month, user=user)

        # summing up all the expenses together
        total_amount = expenses.aggregate(Sum('amount'))['amount__sum']
        if total_amount:
            total_amount = round(total_amount, 2)
        expenses_data = ExpenseSerializer(expenses, many=True).data

        # for each expense in expenses_data
        # check for the type of the expense
        # parse and format the date of the expense accordingly, so that it is displated neatly in the template
        # then append the expense's amount and name with the date (as a tuple) to the proper list based on the type
        # sum the whole amount of the expenses with this type, so that then you can show the total amount of the expenses within this type
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


        # then parse the totals of each expense's type to the dictionairy
        expenses_totals = {
            'food': expense['food']['total'],
            'transport': expense['transport']['total'],
            'bills': expense['bills']['total'],
            'fees': expense['fees']['total'],
            'misc': expense['misc']['total'],
        }

        # then zip those expenses based on the type of the expense's list
        # it zips the longest - meaning it takes one expense from each type and populates the expense row horizontally - by zipping them together
        # if there is no expense to populate the cell in the row, it will be left blank
        # it is made that way so that the expenses of each type are displayed in a column (think of an excel spreadsheet)
        expense_rows = zip_longest(
            expense['food']['expenses'], 
            expense['transport']['expenses'], 
            expense['bills']['expenses'], 
            expense['fees']['expenses'], 
            expense['misc']['expenses'],
            fillvalue=""
            )
        
        # then each row is appended to the list, so that it can be iterated over in the template script
        expenses_list = []
        for expense_row in expense_rows:
            expenses_list.append(expense_row)
        return Response({'expenses_list': expenses_list, 'expenses_totals': expenses_totals, 'total_amount': total_amount})
    

class SubmitExpense(CreateAPIView):
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DeleteExpense(DestroyAPIView):
    serializer_class = ExpenseSerializer    
    queryset = Expense.objects.all()


class UpdateExpense(UpdateAPIView):
    serializer_class = ExpenseSerializer    
    queryset = Expense.objects.all()


def get_user_id(request):
    user_id = request.user.id
    return JsonResponse({'user_id': user_id})