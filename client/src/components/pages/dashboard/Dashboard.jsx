import React, { useState } from "react";
import Navbar from "../../navbar/Navbar";

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
        <h1>Main Dashboard Content</h1>
        <p>This is content that will fill when sidebar collapses.</p>
      </div>
    </div>
  );
};

export default Dashboard;
