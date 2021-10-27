import React from "react";

const GuestsList = ({ guests }) => {
  return (
    <div className="card bg-dark mt-2">
      <div className="card-header">
        <h4> Guests </h4>
      </div>
      <ul className="list-group list-group-flush">
        {guests.map((guest) => (
          <li className="list-group-item" key={guest}>
            <h5> {guest} </h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestsList;
