import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Login from "./components/pages/login/Login";
import Registration from "./components/pages/Registration/Registration";
import ExpensePage from "./components/pages/Expenses/ExpensePage";
import Transactions from "./components/pages/Transactions/Transactions";
import IncomePage from "./components/pages/Incomes/IncomePage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function setAuth(bool) {
    setIsAuthenticated(bool);
  }

  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/me/", {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      console.log("made request");
      console.log(response.status);
      console.log(isAuthenticated);

      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Dashboard
          isAuthenticated={isAuthenticated}
          setAuth={setAuth}
        ></Dashboard>
      ),
    },
    {
      path: "/login",
      element: !isAuthenticated ? (
        <Login setAuth={setAuth}></Login>
      ) : (
        <Navigate to="/" replace={true}></Navigate>
      ),
    },
    {
      path: "/register",
      element: !isAuthenticated ? (
        <Registration setAuth={setAuth}></Registration>
      ) : (
        <Navigate to="/" replace={true}></Navigate>
      ),
    },
    {
      path: "/income",
      element: <IncomePage isAuthenticated={isAuthenticated}></IncomePage>,
    },
    {
      path: "/expense",
      element: <ExpensePage isAuthenticated={isAuthenticated}></ExpensePage>,
    },
    {
      path: "/transactions",
      element: <Transactions isAuthenticated={isAuthenticated}></Transactions>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
