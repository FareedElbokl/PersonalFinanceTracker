import React, { useEffect, useState } from "react";
import "./IncomeContent.css";
import { toast } from "react-toastify";
import CreateIncome from "./CreateIncome";
import DisplayIncome from "./DisplayIncome";

const IncomeContent = (props) => {
  const [totalIncome, setTotalIncome] = useState("0.00");
  const [nonAuthIncomes, setNonAuthIncomes] = useState([]);
  const [nonAuthCategories, setNonAuthCategories] = useState([]);
  const [numIncomes, setNumIncomes] = useState(0);

  async function getTotalIncome() {
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
        const total_income = data.total_income;
        setTotalIncome(total_income.toFixed(2));
      } catch (error) {
        console.error(error.message);
      }
    } else {
      let total = 0;
      for (let income of nonAuthIncomes) {
        total += income.amount; // Accumulate the amount
      }
      setTotalIncome("$" + total.toFixed(2)); // Update state with formatted total
    }
  }

  useEffect(() => {
    getTotalIncome();
  }, [props.isAuthenticated, nonAuthIncomes]);

  return (
    <div className="income-content-container">
      <h1 className="income-content-title" style={{ color: "#2e8b57" }}>
        Incomes
      </h1>
      <div className="total-income">Total Income: {totalIncome}</div>
      <div className="create-display-container">
        <CreateIncome
          isAuthenticated={props.isAuthenticated}
          nonAuthIncomes={nonAuthIncomes}
          setNonAuthIncomes={setNonAuthIncomes}
          nonAuthCategories={nonAuthCategories}
          setNonAuthCategories={setNonAuthCategories}
          getTotalIncome={getTotalIncome}
          setNumIncomes={setNumIncomes}
          numIncomes={numIncomes}
        ></CreateIncome>
        <DisplayIncome
          isAuthenticated={props.isAuthenticated}
          nonAuthIncomes={nonAuthIncomes}
          setNonAuthIncomes={setNonAuthIncomes}
          getTotalIncome={getTotalIncome}
          numIncomes={numIncomes}
        ></DisplayIncome>
      </div>
    </div>
  );
};

export default IncomeContent;
