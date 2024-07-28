import React from "react";
import "../Incomes/IncomeContent.css";

const CategoryModalSingleIncome = (props) => {
  return (
    <div className="category-item">
      <span>{props.name}</span>
      <button
        className="delete-category-btn"
        onClick={() => props.deleteCategory(props.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default CategoryModalSingleIncome;
