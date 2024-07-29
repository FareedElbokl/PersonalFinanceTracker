<<<<<<< HEAD

### Personal Finance Tracker

=======
##Personal Finance Tracker
Overview
The Personal Finance Tracker is a web application designed to help users manage their incomes and expenses. Users can add, view, and categorize their financial transactions, as well as visualize their financial data through various charts and reports.

> > > > > > > 9b01eafa1cc976ba055cdcf85f72e5ab33b706d5

## Overview

This Personal Finance Tracker is a web application designed to help users manage their incomes and expenses. Users can add, view, and categorize their financial transactions, as well as visualize their financial data through various charts and reports.

## Features

- User authentication (login and registration)
- Add, edit, and delete income and expense entries
- Categorize transactions
- Visualize financial data with charts
- Secure API with token-based authentication

## Technologies Used

- Frontend: React, Recharts, CSS
- Backend: Django, Django REST framework
- Database: PostgreSQL
- Authentication: Token-based authentication

## Installation

# Prerequisites

- Node.js and npm
- Python 3.x and pip
- PostgreSQL
- Docker (optional, for running the application using Docker)

# Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/personal-finance-tracker.git
cd personal-finance-tracker
```

2. Set up a virtual environment:

```bash
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
```

3. Install backend dependencies:

```bash
pip install -r server/requirements.txt
```

4. Configure PostgreSQL:

- Create a database and user for the project.
- Update the DATABASES settings in server/settings.py with your PostgreSQL credentials.

5. Run migrations and create a superuser:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

6. Start the backend server:

```bash
python manage.py runserver
```

# Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

# Running with Docker

1. Build and run the Docker containers:

```bash
docker-compose up --build
```

## Usage

1. Open your web browser and navigate to http://localhost:5173 to access the frontend.
2. Register a new user or log in with your credentials, or explore the app without logging in.
3. Add income and expense entries through the dashboard.
4. View and analyze your financial data with the provided charts and reports.

## Screenshots

# Dashboard

# Add Income

# Add Expense

# Transactions

# Login/Registration
