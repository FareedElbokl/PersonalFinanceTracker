import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = (props) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    if (props.isAuthenticated) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/finance/report/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`, // replace with your auth token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const { recent_incomes, recent_expenses } = await response.json();

        // Process the data to match the format needed for Recharts
        const formattedData = [];
        const dates = Array.from(
          new Set([
            ...recent_incomes.map((income) => income.date),
            ...recent_expenses.map((expense) => expense.date),
          ])
        );

        dates.forEach((date) => {
          const incomesForDate = recent_incomes
            .filter((income) => income.date === date)
            .reduce((sum, income) => sum + parseFloat(income.amount), 0);

          const expensesForDate = recent_expenses
            .filter((expense) => expense.date === date)
            .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

          formattedData.push({
            date,
            income: incomesForDate,
            expense: expensesForDate,
          });
        });

        console.log(formattedData); // Log the formatted data to verify
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <ResponsiveContainer width="90%" height={500}>
        <LineChart
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#8884d8" />
          <Line type="monotone" dataKey="expense" stroke="#ff4d4d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
