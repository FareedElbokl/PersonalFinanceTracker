import React, { useState } from "react";
import Navbar from "../../navbar/Navbar";
import ExpenseContent from "./ExpenseContent";

const ExpensePage = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={`app ${isCollapsed ? "collapsed" : ""}`}>
      <Navbar
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        isAuthenticated={props.isAuthenticated}
        setAuth={props.setAuth}
      ></Navbar>
      <div className="content">
        <ExpenseContent
          isAuthenticated={props.isAuthenticated}
        ></ExpenseContent>
      </div>
    </div>
  );
};

export default ExpensePage;
