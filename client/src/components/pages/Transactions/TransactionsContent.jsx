import React, { useState, useEffect } from "react";
import IncomesTransactions from "./IncomesTransactions";
import ExpenseTransactions from "./ExpenseTransactions";

const TransactionsContent = (props) => {
  return (
    <div className="transactions-content-container">
      <h1 style={{ color: "#007fff" }}>Transactions</h1>
      <div className="transactions-container">
        <IncomesTransactions
          isAuthenticated={props.isAuthenticated}
        ></IncomesTransactions>
        <ExpenseTransactions
          isAuthenticated={props.isAuthenticated}
        ></ExpenseTransactions>
      </div>
    </div>
  );
};

export default TransactionsContent;
