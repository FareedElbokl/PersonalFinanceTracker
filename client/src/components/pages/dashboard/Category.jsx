import React from "react";

const Category = (props) => {
  let style = {};
  props.type == "income"
    ? (style = { color: "#17B169" })
    : (style = { color: "#e57373" });
  return (
    <div className="category-container">
      <h3 style={style}>{props.name}</h3>
    </div>
  );
};

export default Category;
