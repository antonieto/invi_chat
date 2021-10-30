import React from "react";
import { Link } from "react-router-dom";

const Card = ({ info }) => {
  return (
    <div className="card evento shadow bg-dark text-white">
      <div className="card-header">
        <div className="card-title">
          <h5> {info.title} </h5>
        </div>
      </div>
      <div className="card-body">
        <p> {info.createdAt} </p>
      </div>
      {/* <p> {info.description} </p> */}
    </div>
  );
};

export default Card;
