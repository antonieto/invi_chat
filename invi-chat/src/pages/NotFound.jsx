import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="center-item">
      <div className="alert alert-primary">
        <h1> 404 </h1>
        <p>This page got deleted or does not exist</p>
      </div>
      <Link className="btn btn-info" to="/">
        {" "}
        Go Back{" "}
      </Link>
    </div>
  );
};

export default NotFound;
