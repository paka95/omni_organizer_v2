from django import forms
from .models import Expense

# class DateInput(forms.DateInput):
#     input_type = 'date'

# class ExpenceForm(forms.ModelForm):
#     TAG_CHOICES = [
#         # ('', 'Select Tag'),
#         ('food', 'Food'),
#         ('transport', 'Transport'),
#         ('bills', 'Bills'),
#         ('fees', 'Fees'),
#         ('misc', 'Misc')
#     ]

#     tag = forms.TypedChoiceField(choices=TAG_CHOICES, empty_value='', widget=forms.Select(attrs={'class': 'input-cell'}))
#     date_created = forms.DateTimeField(widget=DateInput)

#     class Meta:
#         model = Expence
#         fields = '__all__'
#         widgets = {
#             'title': forms.TextInput(attrs={'placeholder': 'Title...', 'class': 'input-cell'}),
#             'amount': forms.TextInput(attrs={'placeholder': 'Amount...', 'class': 'input-cell'}),
#             'tag': forms.Select(attrs={'class': 'input-cell'}, empty_label="Select a tag"),
#             'date_created': forms.DateInput(attrs={'class': 'input-cell-date'}),
#         }