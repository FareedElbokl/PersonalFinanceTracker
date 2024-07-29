##Personal Finance Tracker
Overview
The Personal Finance Tracker is a web application designed to help users manage their incomes and expenses. Users can add, view, and categorize their financial transactions, as well as visualize their financial data through various charts and reports.

Features
User authentication (login and registration)
Add, edit, and delete income and expense entries
Categorize transactions
Visualize financial data with charts
Secure API with token-based authentication
Technologies Used
Frontend: React, Recharts, CSS
Backend: Django, Django REST framework
Database: PostgreSQL
Authentication: Token-based authentication
Installation
Prerequisites
Node.js and npm
Python 3.x and pip
PostgreSQL
Backend Setup
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/personal-finance-tracker.git
cd personal-finance-tracker
Set up a virtual environment:

sh
Copy code
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
Install backend dependencies:

sh
Copy code
pip install -r server/requirements.txt
Configure PostgreSQL:

Create a database and user for the project.
Update the DATABASES settings in server/settings.py with your PostgreSQL credentials.
Run migrations and create a superuser:

sh
Copy code
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
Start the backend server:

sh
Copy code
python manage.py runserver
Frontend Setup
Navigate to the client directory:

sh
Copy code
cd client
Install frontend dependencies:

sh
Copy code
npm install
Start the frontend development server:

sh
Copy code
npm run dev

Running with Docker
Build and run the Docker containers:

bash
Copy code
docker-compose up --build

Usage
Open your web browser and navigate to http://localhost:3000 to access the frontend.
Register a new user or log in with your credentials.
Add income and expense entries through the dashboard.
View and analyze your financial data with the provided charts and reports.
Screenshots
Dashboard

Add Income

Add Expense

Reports

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.
