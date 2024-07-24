import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";

const Registration = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
  });

  const { email, name, password } = inputs;
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  async function onSubmitForm(e) {
    e.preventDefault();

    try {
      const body = { email, password, name };
      const url = "http://localhost:8000/api/user/create/";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status === 401) {
        toast.error("User Already Exists");
        return;
      } else if (response.status == 400) {
        toast.error("Password must be atleast five characters");
      }

      if (response.status == 201) {
        toast.success("Successfully registered");
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="registration-container">
      <h1 className="registration-title">Register</h1>
      <form className="registration-form" onSubmit={onSubmitForm}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              // Add functionality if needed for password visibility toggle
            >
              {/* Placeholder for icon if needed */}
            </button>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Register
        </button>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </div>
        <div className="back-to-home">
          <p>
            Want to go back to{" "}
            <Link to="/" className="link">
              Home
            </Link>
            ?
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Registration;
