import React, { useState } from "react";
import Navbar from "../../navbar/Navbar";
import TransactionsContent from "./TransactionsContent";
import "./Transactions.css";

const Transactions = (props) => {
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
        <TransactionsContent
          isAuthenticated={props.isAuthenticated}
        ></TransactionsContent>
      </div>
    </div>
  );
};

export default Transactions;
