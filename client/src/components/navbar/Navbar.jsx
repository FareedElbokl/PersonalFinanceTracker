import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = (props) => {
  return (
    <div className="sidebar">
      <button
        className="toggle-btn"
        onClick={() => {
          props.toggleSidebar();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul>
        <li>Income</li>
        <li>Expense</li>
        <li>All Transactions</li>
        {!props.isAuthenticated ? (
          <Link to="/login">
            <li>Sign in</li>
          </Link>
        ) : (
          <LogoutButton setAuth={props.setAuth}></LogoutButton>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
