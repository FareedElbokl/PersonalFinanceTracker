from django.urls import path
from . import views

app_name = 'finance'

urlpatterns = [
    # Income URLs
    path('incomes/', views.IncomeListView.as_view(), name='income-list'),
    path('incomes/create/', views.IncomeListView.as_view(), name='income-create'),
    path('incomes/<int:pk>/', views.IncomeDetailView.as_view(), name='income-detail'),
    path('incomes/<int:pk>/update/', views.IncomeDetailView.as_view(), name='income-update'),
    path('incomes/<int:pk>/delete/', views.IncomeDetailView.as_view(), name='income-delete'),

    # Expense URLs
    path('expenses/', views.ExpenseListView.as_view(), name='expense-list'),
    path('expenses/create/', views.ExpenseListView.as_view(), name='expense-create'),
    path('expenses/<int:pk>/', views.ExpenseDetailView.as_view(), name='expense-detail'),
    path('expenses/<int:pk>/update/', views.ExpenseDetailView.as_view(), name='expense-update'),
    path('expenses/<int:pk>/delete/', views.ExpenseDetailView.as_view(), name='expense-delete'),

    # Income Category URLs
    path('income-categories/', views.IncomeCategoryListView.as_view(), name='income-category-list'),
    path('income-categories/create/', views.IncomeCategoryListView.as_view(), name='income-category-create'),
    path('income-categories/<int:pk>/', views.IncomeCategoryDetailView.as_view(), name='income-category-detail'),
    path('income-categories/<int:pk>/update/', views.IncomeCategoryDetailView.as_view(), name='income-category-update'),
    path('income-categories/<int:pk>/delete/', views.IncomeCategoryDetailView.as_view(), name='income-category-delete'),

    # Expense Category URLs
    path('expense-categories/', views.ExpenseCategoryListView.as_view(), name='expense-category-list'),
    path('expense-categories/create/', views.ExpenseCategoryListView.as_view(), name='expense-category-create'),
    path('expense-categories/<int:pk>/', views.ExpenseCategoryDetailView.as_view(), name='expense-category-detail'),
    path('expense-categories/<int:pk>/update/', views.ExpenseCategoryDetailView.as_view(), name='expense-category-update'),
    path('expense-categories/<int:pk>/delete/', views.ExpenseCategoryDetailView.as_view(), name='expense-category-delete'),

    # Dashboard/Report URLs
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
    path('report/', views.ReportView.as_view(), name='report'),
]
