import React from "react";
import { Link } from "react-router-dom";

const Card = ({ info }) => {
  return (
    <>
      <div className="card-header">
        <div className="card-title">
          <h5> {info.title} </h5>
        </div>
      </div>
      <div className="card-body text-white">
        <p> {info.createdAt} </p>
      </div>
      {/* <p> {info.description} </p> */}
    </>
  );
};

export default Card;
