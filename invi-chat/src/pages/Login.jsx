import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser, setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    // Validate data
    if (formData.email.trim("") === "") {
      setErrors([...errors, "Email must not be empty"]);
    }
    if (formData.password.trim("") === "") {
      setErrors([...errors, "Password must not be empty"]);
    }

    if (errors.length !== 0) {
      // User will still be null
      return;
    }
    // No
    setErrors([]);
    // Call backend
    axios
      .post("/login", {
        Headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  if (loading) {
    return <div className="loader"> Loading... </div>;
  }
  return (
    <div className="col">
      <div className="card row position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded">
        <h1 className="fs-1 text-center">Login</h1>
        <form
          className="col"
          onSubmit={handleFormSubmit}
          method="POST"
          action="http://localhost:5001/invi-chat/us-central1/api/login"
        >
          <label className="row mb-3">
            Email:
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </label>
          <label className="row mb-3">
            Password:
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </label>
          <input
            className="row mb-3 btn btn-primary"
            type="submit"
            value="submit"
            name=""
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
