import React from "react";
import { Link } from "react-router-dom";

const Card = ({ info }) => {
  return (
    <div className="card evento p-4 shadow border-rounded">
      <h4> {info.title} </h4>
      <p> {info.guests} </p>
      {/* <p> {info.description} </p> */}
    </div>
  );
};

export default Card;
