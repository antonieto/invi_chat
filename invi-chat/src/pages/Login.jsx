import React, { useState } from "react";
import Error from "../components/Error";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Login = ({ setUser, setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  let history = useHistory();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const callLogin = () => {
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
        setToken(response.data.token.trim());
        setUser(response.data.data);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        setFormData({
          email: "",
          password: "",
        });
        if (err.response.status === 403) {
          setErrors("Incorrect passowrd or email");
        } else {
          setErrors("An error ocurred");
        }
      });
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    setErrors("");
    setLoading(true);
    // Validate data
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrors("Email and password must not be empty");
      setFormData({
        email: "",
        password: "",
      });
      setLoading(false);
      return;
    }

    setErrors("");
    callLogin();
    // Call backend
  };
  if (loading) {
    return <div className="loader"> Loading... </div>;
  }
  return (
    <div className="col">
      <div className="card row center-item shadow p-3 bg-body rounded">
        <h1 className="fs-1 text-center">Login</h1>
        <form className="col" onSubmit={handleFormSubmit} method="POST">
          <label className="row mb-3">
            Email:
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your e-mail"
            />
          </label>
          <label className="row mb-3">
            Password:
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </label>
          <div className="row">
            <input
              className="mx-0 mb-3 btn btn-block btn-info"
              type="submit"
              value="Login"
              name=""
            />
          </div>
          {errors ? <Error message={errors} /> : null}
        </form>
        <Link to="/" className="btn btn-outline-danger">
          &laquo; Back
        </Link>
      </div>
    </div>
  );
};

export default Login;
