import React from "react";
import "../Incomes/IncomeContent.css"; // Ensure you create this CSS file
import "./Expense.css";
import { toast } from "react-toastify"; // Import toast for notifications

const Expense = (props) => {
  return (
    <div className="income-card">
      <div className="income-header">
        <h3 className="income-title">{props.title}</h3>
        <span className="income-amount" style={{ color: "#D32F2F" }}>
          ${props.amount}
        </span>
      </div>
      <div className="income-details">
        <div>
          {props.category && (
            <div className="income-category">Category: {props.category}</div>
          )}
          {props.description && (
            <p className="income-description">{props.description}</p>
          )}
          <div className="income-date">
            Date: {new Date(props.date).toLocaleDateString()}
          </div>
        </div>
        <div className="income-delete-btn-container">
          <button
            className="income-delete-btn"
            onClick={() => {
              props.deleteExpense(props.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expense;
