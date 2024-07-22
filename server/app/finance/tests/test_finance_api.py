"""
Tests for finance api
"""

from decimal import Decimal

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from datetime import timedelta
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APIClient

from core.models import (ExpenseCategory, Expense, IncomeCategory, Income)
from finance.serializers import (
    IncomeSerializer,
    ExpenseSerializer,
    IncomeCategorySerializer,
    ExpenseCategorySerializer
)

def create_income(user, **params):
    """Helper function that creates an income instance for testing purposes."""

    defaults = {
            'title': 'Sample Income Title',
            'amount': 2223,
            'description': 'Sample Income description',
            'date': timezone.now().date()
    }
    defaults.update(params)

    income = Income.objects.create(user=user, **defaults)
    return income



def create_income_category(user, **params):
    """Helper function that creates an income category instance for testing purposes."""

    defaults = {
        'name': 'Sample Income Category'
    }
    defaults.update(params)

    income_category = IncomeCategory.objects.create(user=user, **defaults)
    return income_category

def create_expense(user, **params):
    """Helper function that creates an expense instance for testing purposes."""

    defaults = {
            'title': 'Sample Expense Title',
            'amount': 2223,
            'description': 'Sample Expense description',
            'date': timezone.now().date()
    }
    defaults.update(params)

    expense = Expense.objects.create(user=user, **defaults)
    return expense


def create_expense_category(user, **params):
    """Helper function that creates an expense category instance for testing purposes."""

    defaults = {
        'name': 'Sample Expense Category'
    }
    defaults.update(params)

    expense_category = ExpenseCategory.objects.create(user=user, **defaults)
    return expense_category


class PublicFinanceApiTests(TestCase):
    """Test for public endpoints of finance api."""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is always required for the finance api."""
        res = self.client.get(reverse('finance:income-list'))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateFinanceApiTests(TestCase):
    """Test private endpoints of finance api"""

    def setUp(self):
        # Create a client to make requests from
        self.client = APIClient()

        # Create a user to authenticate with
        self.user = get_user_model().objects.create_user(
            'user@example.com',
            'testpass123'
        )

        # Now authenticate the user through the client
        self.client.force_authenticate(self.user)

    # INCOME TESTS
    def test_get_all_incomes_for_a_user(self):
        """Test retreiving all incomes for a user"""
        # Create another user
        other_user = get_user_model().objects.create_user(
            "other@example.com",
            "password123"
        )

        create_income(user=other_user)
        create_income(user=self.user)
        create_income(user=self.user)

        # Make get request to IncomeListView
        res = self.client.get(reverse('finance:income-list'))

        # Now get the income for the user from the model so we can compare it with the one the api returned
        incomes = Income.objects.filter(user=self.user).order_by('-id')

        # Serialize the income instances
        serializer = IncomeSerializer(incomes, many=True)

        # Check status code success and that serialized data matches request data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_income(self):
        """Test creating an income as a user."""

        # Define payload
        payload = {
            'title': 'new income',
            'amount': '500',
            'description': 'New Income description'
        }

        # make the request
        res = self.client.post(reverse('finance:income-create'), payload)

        # check status code
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_get_income_detail(self):
        """Test get income detail (getting a specific income)."""
        income = create_income(user=self.user)

        url = reverse('finance:income-detail', args=[income.id])

        res = self.client.get(url)

        serializer = IncomeSerializer(income)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_income_detail_not_found(self):
        """Test that trying to get a non-existent income returns a 404 status code."""
        url = reverse('finance:income-detail', args=[9999])  # A non-existent ID

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


    def test_delete_income_detail(self):
        """Test delete income detail."""
        income = create_income(user=self.user)

        url = reverse('finance:income-delete', args=[income.id])

        # Make the DELETE request
        res = self.client.delete(url)

        # Assert that the response status code is 204 (No Content)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        # Assert that the income object has been deleted
        self.assertFalse(Income.objects.filter(id=income.id).exists())

    # EXPENSE TESTS
    def test_get_all_expenses_for_a_user(self):
        """Test retreiving all expenses for a user."""
        # Create another user
        other_user = get_user_model().objects.create_user(
            "other@example.com",
            "password123"
        )

        create_expense(user=other_user)
        create_expense(user=self.user)
        create_expense(user=self.user)

        # Make get request to IncomeListView
        res = self.client.get(reverse('finance:expense-list'))

        # Now get the incomes for the user from the model so we can compare it with the ones the api returned
        expenses = Expense.objects.filter(user=self.user).order_by('-id')

        # Serialize the income instances
        serializer = ExpenseSerializer(expenses, many=True)

        # Check status code success and that serialized data matches request data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_expense(self):
        """Test creating an expense as a user."""
        # Define payload
        payload = {
            'title': 'new expense',
            'amount': '500',
            'description': 'New Expense description'
        }

        # make the request
        res = self.client.post(reverse('finance:expense-create'), payload)

        # check status code
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_get_expense_detail(self):
        """Test getting an expense detail."""
        expense = create_expense(user=self.user)

        url = reverse('finance:expense-detail', args=[expense.id])

        res = self.client.get(url)

        serializer = ExpenseSerializer(expense)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_expense_detail_not_found(self):
        """Test that trying to get a non-existent expense returns a 404 status code."""
        url = reverse('finance:expense-detail', args=[9999])  # A non-existent ID

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_expense_detail(self):
        """Test delete expense detail."""
        expense = create_expense(user=self.user)

        url = reverse('finance:expense-delete', args=[expense.id])

        # Make the DELETE request
        res = self.client.delete(url)

        # Assert that the response status code is 204 (No Content)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        # Assert that the income object has been deleted
        self.assertFalse(Expense.objects.filter(id=expense.id).exists())


    # INCOME CATEGORY TESTS
    def test_get_all_income_categories_for_a_user(self):
        """Test that retreiving all income categories for a user is successfull."""
        # Create another user
        other_user = get_user_model().objects.create_user(
            "other@example.com",
            "password123"
        )

        # Create income categories using both the other user and self.user
        create_income_category(user=other_user)
        create_income_category(user=self.user)
        create_income_category(user=self.user)

        res = self.client.get(reverse('finance:income-category-list'))

        # Get model instance incomes
        incomes = IncomeCategory.objects.filter(user=self.user).order_by('-id')

        # Serialize the model instance incomes
        serializer = IncomeCategorySerializer(incomes, many=True)

        # Check status code
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_income_category(self):
        """Test creating an income category as a user"""
        # Define payload
        payload = {
            'name': 'Sample income category'
        }

        # make the request
        res = self.client.post(reverse('finance:income-category-create'), payload)

        # check status code
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_delete_income_category_detail(self):
        """Test deleting a specific income category"""
        income_category = create_income_category(user=self.user)

        url = reverse('finance:income-category-delete', args=[income_category.id])

        # Make the DELETE request
        res = self.client.delete(url)

        # Assert that the response status code is 204 (No Content)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        # Assert that the income object has been deleted
        self.assertFalse(IncomeCategory.objects.filter(id=income_category.id).exists())

    # EXPENSE CATEGORY TESTS
    def test_get_all_expense_categories_for_a_user(self):
        """Test that retreiving all expense categories for a user is successfull."""
        # Create another user
        other_user = get_user_model().objects.create_user(
            "other@example.com",
            "password123"
        )

        # Create income categories using both the other user and self.user
        create_expense_category(user=other_user)
        create_expense_category(user=self.user)
        create_expense_category(user=self.user)

        res = self.client.get(reverse('finance:expense-category-list'))

        # Get model instance incomes
        expenses = ExpenseCategory.objects.filter(user=self.user).order_by('-id')

        # Serialize the model instance incomes
        serializer = ExpenseCategorySerializer(expenses, many=True)

        # Check status code
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_expense_category(self):
        """Test creating an expense category as a user"""
        # Define payload
        payload = {
            'name': 'Sample Expense Category'
        }

        # make the request
        res = self.client.post(reverse('finance:expense-category-create'), payload)

        # check status code
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_delete_expense_category_detail(self):
        """Test deleting a specific expense category"""
        expense_category = create_expense_category(user=self.user)

        url = reverse('finance:expense-category-delete', args=[expense_category.id])

        # Make the DELETE request
        res = self.client.delete(url)

        # Assert that the response status code is 204 (No Content)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        # Assert that the income object has been deleted
        self.assertFalse(ExpenseCategory.objects.filter(id=expense_category.id).exists())

     # TEST DASHBOARD VIEW
    def test_get_dashboard_data(self):
        """Test retrieving dashboard data for a user is successful"""
        # Create sample incomes and expenses
        create_income(user=self.user, amount=100.00)
        create_income(user=self.user, amount=200.00)
        create_expense(user=self.user, amount=50.00)
        create_expense(user=self.user, amount=150.00)

        # Make GET request to DashboardView
        res = self.client.get(reverse('finance:dashboard'))

        # Check status code success
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # Check the data
        self.assertEqual(res.data['total_income'], 300.00)
        self.assertEqual(res.data['total_expense'], 200.00)
        self.assertEqual(res.data['net_savings'], 100.00)

    # TEST REPORT VIEW
    def test_get_report_data(self):
        """
        Test retrieving graph report data for a user is successful.
        The idea of this view is to get the total income of the user for each of the past 4 days,
        and the total expense of the user for each of the past four days.
        """
        today = timezone.now().date()
        # Create sample incomes and expenses for the past four days.
        create_income(user=self.user, amount=100.00, date=today - timedelta(days=1))
        create_income(user=self.user, amount=200.00, date=today - timedelta(days=2))
        create_expense(user=self.user, amount=50.00, date=today - timedelta(days=3))
        create_expense(user=self.user, amount=150.00, date=today - timedelta(days=4))

        # Make GET request to ReportView
        res = self.client.get(reverse('finance:report'))

        # Check status code success
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # Serialize recent incomes and expenses
        recent_incomes = Income.objects.filter(user=self.user, date__gte=today - timedelta(days=4)).order_by('-date')
        recent_expenses = Expense.objects.filter(user=self.user, date__gte=today - timedelta(days=4)).order_by('-date')

        income_serializer = IncomeSerializer(recent_incomes, many=True)
        expense_serializer = ExpenseSerializer(recent_expenses, many=True)

        # Check the data
        self.assertEqual(res.data['recent_incomes'], income_serializer.data)
        self.assertEqual(res.data['recent_expenses'], expense_serializer.data)









