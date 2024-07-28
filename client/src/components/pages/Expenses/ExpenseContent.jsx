import React, { useEffect, useState } from "react";
import "../Incomes/IncomeContent.css";
import "./Expense.css";
import { toast } from "react-toastify";
import CreateExpense from "./CreateExpense";
import DisplayExpense from "./DisplayExpense";

const ExpenseContent = (props) => {
  const [totalExpense, setTotalExpense] = useState("$0");
  const [nonAuthExpenses, setNonAuthExpenses] = useState([]);
  const [nonAuthCategories, setNonAuthCategories] = useState([]);
  const [numExpenses, setNumExpenses] = useState(0);

  async function getTotalExpense() {
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
        setTotalExpense(total_expense.toFixed(2));
      } catch (error) {
        console.error(error.message);
      }
    } else {
      let total = 0;
      for (let expense of nonAuthExpenses) {
        total += expense.amount; // Accumulate the amount
      }
      setTotalExpense(total.toFixed(2)); // Update state with formatted total
    }
  }

  useEffect(() => {
    getTotalExpense();
  }, [props.isAuthenticated, nonAuthExpenses]);

  return (
    <div className="income-content-container">
      <h1 className="income-content-title" style={{ color: "#D32F2F" }}>
        Expenses
      </h1>
      <div className="total-income" style={{ color: "#D32F2F" }}>
        Total Expense: ${totalExpense}
      </div>
      <div className="create-display-container">
        <CreateExpense
          isAuthenticated={props.isAuthenticated}
          nonAuthExpenses={nonAuthExpenses}
          setNonAuthExpenses={setNonAuthExpenses}
          nonAuthCategories={nonAuthCategories}
          setNonAuthCategories={setNonAuthCategories}
          getTotalExpense={getTotalExpense}
          numExpenses={numExpenses}
          setNumExpenses={setNumExpenses}
        ></CreateExpense>
        <DisplayExpense
          isAuthenticated={props.isAuthenticated}
          nonAuthExpenses={nonAuthExpenses}
          setNonAuthExpenses={setNonAuthExpenses}
          getTotalExpense={getTotalExpense}
          numExpenses={numExpenses}
        ></DisplayExpense>
      </div>
    </div>
  );
};

export default ExpenseContent;
