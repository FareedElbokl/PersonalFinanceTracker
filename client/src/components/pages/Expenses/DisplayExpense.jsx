import React, { useState, useEffect } from "react";
import Expense from "./Expense";
import "../Incomes/IncomeContent.css";
import "./Expense.css";
import { toast } from "react-toastify";

const DisplayExpense = (props) => {
  const [expenses, setExpenses] = useState([]);

  async function getUserExpenses() {
    //Get user incomes from the api
    if (props.isAuthenticated) {
      try {
        const url = "http://localhost:8000/api/finance/expenses/";
        const response = await fetch(url, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
          toast.error("Something went wrong retrieving expenses.");
          return;
        }

        const data = await response.json();

        // Fetch categories and add the category name to each income object
        const updatedExpenses = await Promise.all(
          data.map(async (expense) => {
            if (!expense.category) {
              return expense; // Skip if category is null or not in the object
            }

            try {
              const categoryUrl = `http://localhost:8000/api/finance/expense-categories/${expense.category}/`;
              const categoryResponse = await fetch(categoryUrl, {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              });

              if (categoryResponse.ok) {
                const categoryData = await categoryResponse.json();
                expense.categoryName = categoryData.name;
              } else {
                toast.error(
                  `Failed to fetch category for expense ${expense.id}`
                );
              }
            } catch (error) {
              console.error(
                `Error fetching category for expense ${expense.id}:`,
                error
              );
            }

            return expense;
          })
        );

        setExpenses(updatedExpenses);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setExpenses(props.nonAuthExpenses);
    }
  }

  async function deleteExpense(id) {
    if (props.isAuthenticated) {
      try {
        const url = `http://localhost:8000/api/finance/expenses/${id}/delete/`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the token if authenticated
          },
        });

        if (response.ok) {
          toast.success("Expense deleted successfully");
        } else {
          toast.error("Unable to delete expense");
        }
      } catch (error) {
        console.error(error.message);
        toast.error("An error occurred while deleting the expense");
      }
    } else {
      // Handle non-authenticated user
      props.setNonAuthExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      toast.success("Expense removed from your list");
    }
    props.getTotalExpense();
    getUserExpenses();
  }

  useEffect(() => {
    getUserExpenses();
  }, [props.isAuthenticated, props.nonAuthExpenses, props.numExpenses]);

  return (
    <div
      className={`income-display-container ${
        expenses.length == 0 ? "empty-income-display-container" : ""
      }`}
    >
      {expenses.length == 0 ? (
        <h1>No Current Expenses</h1>
      ) : (
        expenses.map((expense) => {
          return (
            <Expense
              key={expense.id} // Ensure you have a unique key, assuming expense object has an id
              id={expense.id}
              title={expense.title}
              category={expense.categoryName}
              amount={expense.amount}
              description={expense.description}
              date={expense.date}
              isAuthenticated={props.isAuthenticated}
              deleteExpense={deleteExpense}
            ></Expense>
          );
        })
      )}
    </div>
  );
};

export default DisplayExpense;
