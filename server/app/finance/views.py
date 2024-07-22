from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from core.models import Income, Expense, IncomeCategory, ExpenseCategory
from .serializers import IncomeSerializer, ExpenseSerializer, IncomeCategorySerializer, ExpenseCategorySerializer
from datetime import date, timedelta
from django.utils import timezone
from django.db.models import Sum

# Income Views
class IncomeListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        incomes = Income.objects.filter(user=request.user).order_by('-id')
        serializer = IncomeSerializer(incomes, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = IncomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IncomeDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        try:
            income = Income.objects.get(pk=pk, user=request.user)
        except Income.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = IncomeSerializer(income)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        try:
            income = Income.objects.get(pk=pk, user=request.user)
        except Income.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = IncomeSerializer(income, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        try:
            income = Income.objects.get(pk=pk, user=request.user)
        except Income.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        income.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Expense Views
class ExpenseListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        expenses = Expense.objects.filter(user=request.user).order_by('-id')
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExpenseDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        try:
            expense = Expense.objects.get(pk=pk, user=request.user)
        except Expense.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        try:
            expense = Expense.objects.get(pk=pk, user=request.user)
        except Expense.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        try:
            expense = Expense.objects.get(pk=pk, user=request.user)
        except Expense.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Income Category Views
class IncomeCategoryListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        categories = IncomeCategory.objects.filter(user=request.user).order_by('-id')
        serializer = IncomeCategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = IncomeCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IncomeCategoryDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        try:
            category = IncomeCategory.objects.get(pk=pk, user=request.user)
        except IncomeCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = IncomeCategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        try:
            category = IncomeCategory.objects.get(pk=pk, user=request.user)
        except IncomeCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = IncomeCategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        try:
            category = IncomeCategory.objects.get(pk=pk, user=request.user)
        except IncomeCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Expense Category Views
class ExpenseCategoryListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        categories = ExpenseCategory.objects.filter(user=request.user).order_by('-id')
        serializer = ExpenseCategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ExpenseCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExpenseCategoryDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        try:
            category = ExpenseCategory.objects.get(pk=pk, user=request.user)
        except ExpenseCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ExpenseCategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        try:
            category = ExpenseCategory.objects.get(pk=pk, user=request.user)
        except ExpenseCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ExpenseCategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        try:
            category = ExpenseCategory.objects.get(pk=pk, user=request.user)
        except ExpenseCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Dashboard/Report Views
class DashboardView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Example of how to gather data for the dashboard
        total_income = Income.objects.filter(user=request.user).aggregate(Sum('amount'))['amount__sum'] or 0
        total_expense = Expense.objects.filter(user=request.user).aggregate(Sum('amount'))['amount__sum'] or 0
        data = {
            'total_income': total_income,
            'total_expense': total_expense,
            'net_savings': total_income - total_expense,
        }
        return Response(data)

class ReportView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Example of how to gather data for the report
        recent_incomes = Income.objects.filter(user=request.user, date__gte=date.today()-timedelta(days=4))
        recent_expenses = Expense.objects.filter(user=request.user, date__gte=date.today()-timedelta(days=4))
        data = {
            'recent_incomes': IncomeSerializer(recent_incomes, many=True).data,
            'recent_expenses': ExpenseSerializer(recent_expenses, many=True).data,
        }
        return Response(data)
