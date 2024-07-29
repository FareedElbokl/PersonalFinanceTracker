import React, { useState, useEffect } from "react";
import Category from "./Category";

const Data = (props) => {
  const [totalIncome, setTotalIncome] = useState("0");
  const [totalExpense, setTotalExpense] = useState("0");
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  async function getTotalData() {
    console.log("Getting total dashboard");
    if (props.isAuthenticated) {
      try {
        const url = "http://localhost:8000/api/finance/dashboard/";

        const response = await fetch(url, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
          toast.error("Something went wrong");
          return;
        }

        const data = await response.json();
        const total_expense = data.total_expense;
        const total_income = data.total_income;
        setTotalExpense(total_expense.toFixed(2));
        setTotalIncome(total_income.toFixed(2));
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async function getIncomeCategoryData() {
    if (props.isAuthenticated) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/finance/income-categories/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          console.error("Failed to fetch categories");
          toast.error("Failed to fetch categories");
          return;
        }
        const data = await response.json();
        setIncomeCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  }

  async function getExpenseCategoryData() {
    if (props.isAuthenticated) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/finance/expense-categories/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          console.error("Failed to fetch categories");
          toast.error("Failed to fetch categories");
          return;
        }
        const data = await response.json();
        setExpenseCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  }

  useEffect(() => {
    getExpenseCategoryData();
    getIncomeCategoryData();
    getTotalData();
  }, []);

  return (
    <div className="data-container">
      <div className="income-expense-display-container">
        <div className="total-income-container">
          Total Income: ${totalIncome}
        </div>
        <div className="total-income-container total-expense-container">
          Total Expense: ${totalExpense}
        </div>
      </div>
      <div className="categories-display-container">
        <div className="income-categories-display">
          <h2>Income Categories</h2>
          <div className="income-category-list">
            {incomeCategories.map((category) => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                type={"income"}
              ></Category>
            ))}
          </div>
        </div>
        <div className="expense-categories-display">
          <h2>Expense Categories</h2>
          <div className="expense-category-list">
            {expenseCategories.map((category) => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                type={"expense"}
              ></Category>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
