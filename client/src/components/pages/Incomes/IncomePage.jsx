import React, { useState } from "react";
import Navbar from "../../navbar/Navbar";
import IncomeContent from "./IncomeContent";

const IncomePage = (props) => {
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
        <IncomeContent isAuthenticated={props.isAuthenticated}></IncomeContent>
      </div>
    </div>
  );
};

export default IncomePage;
