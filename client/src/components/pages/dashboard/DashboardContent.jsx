import React from "react";
import Data from "./Data";
import Chart from "./Chart";

const DashboardContent = (props) => {
  return (
    <div className="dashboard-content-container">
      <h1>Dashboard</h1>
      <div className="data-and-chart-container">
        <Data isAuthenticated={props.isAuthenticated}></Data>
        <Chart isAuthenticated={props.isAuthenticated}></Chart>
      </div>
    </div>
  );
};

export default DashboardContent;
