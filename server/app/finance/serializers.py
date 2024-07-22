from rest_framework import serializers
from core.models import Income, Expense, IncomeCategory, ExpenseCategory

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['id', 'user', 'title', 'amount', 'category', 'description', 'date']
        read_only_fields = ['id', 'user']

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'user', 'title', 'amount', 'category', 'description', 'date']
        read_only_fields = ['id', 'user']

class IncomeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeCategory
        fields = ['id', 'user', 'name']
        read_only_fields = ['id', 'user']

class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = ['id', 'user', 'name']
        read_only_fields = ['id', 'user']
