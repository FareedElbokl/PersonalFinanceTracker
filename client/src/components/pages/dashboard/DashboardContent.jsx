import React from "react";
import Data from "./Data";
import Chart from "./Chart";

const DashboardContent = (props) => {
  return (
    <div className="dashboard-content-container">
      <h1>Dashboard</h1>
      <div className="content-wrapper">
        <div
          className={`data-and-chart-container ${
            !props.isAuthenticated ? "blurred" : ""
          }`}
        >
          <Data isAuthenticated={props.isAuthenticated}></Data>
          <Chart isAuthenticated={props.isAuthenticated}></Chart>
        </div>
        {!props.isAuthenticated && (
          <div className="overlay">
            <p>Must have an account to access this content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
