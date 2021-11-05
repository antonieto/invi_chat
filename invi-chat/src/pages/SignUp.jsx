import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";

const SignUp = ({ setToken, setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const callSignUp = () => {
    return axios.post(
      "https://us-central1-invi-chat.cloudfunctions.net/api/signup",
      {
        Headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        handle: formData.handle,
      }
    );
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim() ||
      !formData.handle.trim()
    ) {
      setErrors("Every field is required");
      setLoading(false);
      return;
    }
    setErrors("");
    callSignUp()
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setToken(response.data.token);
          setUser(response.data.data);
          history.push("/");
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrors("Email already in use");
          setLoading(false);
        } else if (err.response.data.error === "auth/email-already-in-use") {
          setErrors("Email already in use");
          setLoading(false);
        } else {
          console.log(err);
        }
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="col center-item" style={{ width: "350px" }}>
      <div className="card row shadow p-3 mb-5 bg-body rounded">
        <h1 className="fs-1 text-center">Sign Up</h1>
        <form
          className="col"
          onSubmit={handleSubmit}
          method="POST"
          action="http://localhost:5001/invi-chat/us-central1/api/login"
        >
          <div className="row mb-2">
            <label>Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="row mb-2">
            <label className="">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-2">
            <label> Confirm Password: </label>
            <input
              name="confirmPassword"
              type="password"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="row mb-2">
            <label> Username: </label>
            <input
              name="handle"
              type="text"
              className="form-control"
              value={formData.handle}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <input
              className="mx-0 mb-3 btn btn-block btn-info"
              type="submit"
              value="Submit"
              name=""
            />
          </div>
          <div className="row">
            {errors ? <Error message={errors} /> : null}
          </div>
        </form>
        <Link to="/" className="btn btn-outline-danger">
          &laquo; Back
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
