import React, { useState } from "react";
import Navbar from "../../navbar/Navbar";
import DashboardContent from "./DashboardContent";
import "./Dashboard.css";

const Dashboard = (props) => {
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
        <DashboardContent
          isAuthenticated={props.isAuthenticated}
        ></DashboardContent>
      </div>
    </div>
  );
};

export default Dashboard;
