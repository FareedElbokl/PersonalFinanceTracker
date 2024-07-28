import React, { useState } from "react";

const Data = () => {
  const [totalIncome, setTotalIncome] = useState([]);
  const [totalExpense, setTotalExpense] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  return (
    <div className="data-container">
      <div className="income-expense-display-container">
        <div className="total-income-container">Total Income: $5</div>
        <div className="total-income-container total-expense-container">
          Total Expense: $11
        </div>
      </div>
      <div className="categories-display-container"></div>
    </div>
  );
};

export default Data;
