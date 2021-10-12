import React from "react";

const Card = ({ info }) => {
  return (
    <div className="card evento p-4 shadow border-rounded">
      <h2> {info.title} </h2>
      <h4> {info.guests} </h4>
      <p> {info.description} </p>
    </div>
  );
};

export default Card;
