import React, { useState, useEffect } from "react";
import "../Incomes/IncomeContent.css";
import "./Expense.css";
import CategoryModalSingleExpense from "./CategoryModalSingleExpense";
import { toast } from "react-toastify";
const CategoryExpenseModal = (props) => {
  if (!props.showModal) {
    return null;
  }
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    // Fetch categories from the API
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
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    } else {
      //handle non authenticated user
      setCategories(props.nonAuthCategories);
    }
  };

  const createCategory = async () => {
    // Create a new category using the API
    if (newCategory.trim() === "") {
      return;
    }

    if (props.isAuthenticated) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/finance/expense-categories/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name: newCategory }),
          }
        );

        if (!response.ok) {
          console.error("Failed to create category");
          return;
        }

        const newCategoryData = await response.json();
        setCategories([...categories, newCategoryData]);
        setNewCategory(""); // Clear the input
      } catch (error) {
        console.error("Error creating category:", error);
      }
    } else {
      const body = {
        id: props.nonAuthCategories.length + 1,
        name: newCategory,
      };
      props.setNonAuthCategories([...props.nonAuthCategories, body]);
      toast.success("Category created");
    }
    props.getUserExpenseCategories();
  };

  const deleteCategory = async (categoryId) => {
    // Delete a category using the API
    if (props.isAuthenticated) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/finance/expense-categories/${categoryId}/delete/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to delete category");
          return;
        }

        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    } else {
      props.setNonAuthCategories(
        props.nonAuthCategories.filter((category) => category.id !== categoryId)
      );
      toast.success("Category removed from your list");
    }
    props.getUserExpenseCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, [props.showModal, props.nonAuthCategories]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      props.closeModal();
    }
  };

  return (
    <div className="category-modal-overlay" onClick={handleOverlayClick}>
      <div className="category-modal-container">
        <h2>Manage Expense Categories</h2>
        <div className="category-list">
          {categories.map((category) => (
            <CategoryModalSingleExpense
              key={category.id}
              id={category.id}
              name={category.name}
              deleteCategory={deleteCategory}
            ></CategoryModalSingleExpense>
          ))}
        </div>
        <div className="create-category">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button onClick={createCategory}>Add Category</button>
        </div>
        <button
          className="close-modal-btn"
          onClick={(e) => {
            props.closeModal();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CategoryExpenseModal;
