import React, { useState, useEffect } from "react";
import "./IncomeContent.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CategoryIncomeModal from "./CategoryIncomeModal";
import { toast } from "react-toastify";

const CreateIncome = (props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Validate amount input to ensure it's a number
  function handleAmountChange(e) {
    const value = e.target.value;

    // Allow input of numbers, empty string, and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  }

  async function handleSubmitForm(e) {
    e.preventDefault(); // Prevent default form submission
    // Make the request to create an income here

    // Convert amount to a number and handle invalid input
    const incomeAmount = parseFloat(amount);
    if (isNaN(incomeAmount)) {
      toast.error("Please enter a valid number for the amount.");
      return;
    }

    if (props.isAuthenticated) {
      try {
        const body = { title, amount: incomeAmount, description, category };
        const url = "http://localhost:8000/api/finance/incomes/create/";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        });

        if (response.status != 201) {
          toast.error("Unable to create income");
          return;
        }
        toast.success("Income created");
      } catch (error) {
        console.error(error.message);
      }
    } else {
      const currentDate = new Date().toISOString();

      const body = {
        id: props.nonAuthIncomes.length + 1,
        title,
        amount: incomeAmount,
        description,
        category,
        date: currentDate,
      };
      props.setNonAuthIncomes([...props.nonAuthIncomes, body]);
      toast.success("Expense created");
    }
    setCategory("");
    props.getTotalIncome();
    props.setNumIncomes(props.numIncomes + 1);
  }

  async function getUserIncomeCategories() {
    if (props.isAuthenticated) {
      try {
        const url = "http://localhost:8000/api/finance/income-categories/";
        const response = await fetch(url, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
          toast.error("Something went wrong");
          return;
        }

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error(error.message);
        toast.error("An error occurred while fetching the expense categories.");
      }
    } else {
      setCategories(props.nonAuthCategories);
      if (!props.nonAuthCategories.some((cat) => cat.name === category)) {
        setCategory("");
      }
    }
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  useEffect(() => {
    getUserIncomeCategories();
  }, [props.isAuthenticated, props.nonAuthCategories]);

  return (
    <div className="create-income-container">
      <CategoryIncomeModal
        isAuthenticated={props.isAuthenticated}
        nonAuthCategories={props.nonAuthCategories}
        setNonAuthCategories={props.setNonAuthCategories}
        showModal={showCategoryModal}
        closeModal={() => {
          setShowCategoryModal(false);
        }}
        getUserIncomeCategories={getUserIncomeCategories}
      ></CategoryIncomeModal>
      <form onSubmit={handleSubmitForm} className="create-income-form">
        <div className="create-content-container">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
          {props.isAuthenticated ? (
            <div className="category-container">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category || ""}
                  label="Category"
                  onChange={handleCategoryChange}
                  defaultValue=""
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                type="button"
                className="category-button"
                onClick={() => {
                  setShowCategoryModal(true);
                }}
              >
                Add
              </button>
            </div>
          ) : null}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIncome;
