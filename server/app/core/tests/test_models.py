"""
Tests for models
"""
from decimal import Decimal

from django.test import TestCase
from django.contrib.auth import get_user_model # imports whatever the default user model is for the django project

from core import models

class ModelTests(TestCase):
    """Test models."""

    def test_create_user_with_email_successfull(self): # have to specify "test" at begginning of function name
        """Test creating a user with an email is successfull"""
        email = "test@example.com"
        password = "testpass123"
        user = get_user_model().objects.create_user(
            email=email,
            password=password,
        )


        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test email is normalized for new users"""
        sample_emails = [
            ['test1@EXAMPLE.com', 'test1@example.com'],
            ['Test2@Example.com', 'Test2@example.com'],
            ['TEST3@EXAMPLE.COM', 'TEST3@example.com'],
            ['test4@example.COM', 'test4@example.com']
        ]

        for email, expected in sample_emails:
            user = get_user_model().objects.create_user(email, 'sample123')
            self.assertEqual(user.email, expected)


    def test_new_user_without_email_raises_error(self):
        """Test that creating a user without an email raises a value error."""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user("", "test123")


    def test_create_superuser(self):
        """Test creating a super user"""
        user = get_user_model().objects.create_superuser(
            "test@example.com",
            'test123'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_create_income_category(self):
        """Test creating an income category is successful"""

        # First create an authenticated user to test with
        user  = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )

        # Now attempt to create an income category
        income_category = models.IncomeCategory.objects.create(
            user = user,
            name = "Test Income Category"
        )

        self.assertEqual(str(income_category), income_category.name)

    def test_create_expense_category(self):
        """Test creating an expense category is successfull"""

        # First create an authenticated user to test with
        user = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )

        # Now attempt create an expense category
        expense_category = models.ExpenseCategory.objects.create(
            user = user,
            name = "Test expense category"
        )

        self.assertEqual(str(expense_category), expense_category.name)

    def test_delete_income_category(self):
        """Test deleting an income category is successful"""

        # First create an authenticated user to test with
        user  = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )

        # Create an income category
        income_category = models.IncomeCategory.objects.create(
            user = user,
            name = "Test Income Category"
        )

        # Delete the income category
        income_category.delete()

        # Check if the category has been deleted
        self.assertFalse(
            models.IncomeCategory.objects.filter(id=income_category.id).exists()
        )

    def test_delete_expense_category(self):
        """Test deleting an expense category is successful"""

        # First create an authenticated user to test with
        user = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )

        # Create an expense category
        expense_category = models.ExpenseCategory.objects.create(
            user = user,
            name = "Test Expense Category"
        )

        # Delete the expense category
        expense_category.delete()

        # Check if the category has been deleted
        self.assertFalse(
            models.ExpenseCategory.objects.filter(id=expense_category.id).exists()
        )


    def test_create_income(self):
        """Test creating an Income instance is successfull"""

        # First create a user to test with
        user = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )

        # Create an income (no category in this case)
        income = models.Income.objects.create(
            user=user,
            title="Example Income Title",
            amount = 2344.4,
            description = "Example Income Description"
        )

        self.assertEqual(income.title, "Example Income Title")
        self.assertEqual(income.amount, 2344.4)
        self.assertEqual(income.description, "Example Income Description")
        self.assertEqual(income.user, user)
        self.assertIsNone(income.category)

    def test_delete_income(self):
        """Test deleting an income is successfull."""

        # First create a user to test with
        user = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )

        # Create an income to delete
        income = models.Income.objects.create(
            user=user,
            title="Example Income title",
            amount = 2344.4,
            description = "Example Income Description"
        )

        # Delete the income
        income.delete()

        # Assert the income was deleted
        # Check if the category has been deleted
        self.assertFalse(
            models.Income.objects.filter(id=income.id).exists()
        )

    def test_create_expense(self):
        """Test creating an expense is successfull."""

        # First create a user to test with
        user = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )

        # Create a category
        expense_category = models.ExpenseCategory.objects.create(
            user = user,
            name = "Test expense category"
        )

        # Create an income (no category in this case)
        expense = models.Expense.objects.create(
            user=user,
            title="Example Expense Title",
            amount = 3222.4,
            category= expense_category,
            description = "Example Expense Description"
        )

        # Assert that the expense was created successfully
        self.assertEqual(expense.title, "Example Expense Title")
        self.assertEqual(expense.amount, 3222.4)
        self.assertEqual(expense.description, "Example Expense Description")
        self.assertEqual(expense.user, user)
        self.assertEqual(expense.category, expense_category)



    def test_delete_expense(self):
        """Test deleting an expense is successfull"""

         # First create a user to test with
        user = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )

        # Create a category
        expense_category = models.ExpenseCategory.objects.create(
            user = user,
            name = "Test expense category"
        )

        # Create an expense to delete
        expense = models.Expense.objects.create(
            user=user,
            title="Example Expense title",
            amount = 2344.4,
            category = expense_category,
            description = "Example Income Description"
        )

        # Delete the expense
        expense.delete()

        # Assert the expense was deleted
        self.assertFalse(
            models.Expense.objects.filter(id=expense.id).exists()
        )


