import React, { useEffect, useState } from "react";
import Income from "../Incomes/Income";
import { toast } from "react-toastify";

const IncomesTransactions = (props) => {
  const [incomes, setIncomes] = useState([]);

  async function getUserIncomes() {
    //Get user incomes from the api
    if (props.isAuthenticated) {
      try {
        const url = "http://localhost:8000/api/finance/incomes/";
        const response = await fetch(url, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
          toast.error("Something went wrong retreiving incomes.");
          return;
        }

        const data = await response.json();

        // Fetch categories and add the category name to each income object
        const updatedIncomes = await Promise.all(
          data.map(async (income) => {
            if (!income.category) {
              return income; // Skip if category is null or not in the object
            }

            try {
              const categoryUrl = `http://localhost:8000/api/finance/income-categories/${income.category}/`;
              const categoryResponse = await fetch(categoryUrl, {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              });

              if (categoryResponse.ok) {
                const categoryData = await categoryResponse.json();
                income.categoryName = categoryData.name;
              } else {
                toast.error(`Failed to fetch category for income ${income.id}`);
              }
            } catch (error) {
              console.error(
                `Error fetching category for income ${income.id}:`,
                error
              );
            }

            return income;
          })
        );

        setIncomes(updatedIncomes);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async function deleteIncome(id) {
    if (props.isAuthenticated) {
      try {
        const url = `http://localhost:8000/api/finance/incomes/${id}/delete/`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the token if authenticated
          },
        });

        if (response.ok) {
          toast.success("Income deleted successfully");
        } else {
          toast.error("Unable to delete income");
        }
      } catch (error) {
        console.error(error.message);
        toast.error("An error occurred while deleting the income");
      }
    }
    getUserIncomes();
  }

  useEffect(() => {
    getUserIncomes();
  }, [props.isAuthenticated]);

  return (
    <div className="income-transactions-container">
      <h1 style={{ color: "#2e8b57" }}>Income Transactions</h1>
      <div className="income-component-container">
        {incomes.map((income) => {
          return (
            <Income
              key={income.id} // Ensure you have a unique key, assuming expense object has an id
              id={income.id}
              title={income.title}
              category={income.categoryName}
              amount={income.amount}
              description={income.description}
              date={income.date}
              isAuthenticated={income.isAuthenticated}
              deleteIncome={deleteIncome}
            ></Income>
          );
        })}
      </div>
    </div>
  );
};

export default IncomesTransactions;
