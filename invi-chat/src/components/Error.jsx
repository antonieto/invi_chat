import React from "react";

const Error = ({ message }) => {
  if (!message.trim()) return null;
  return (
    <div className="alert alert-danger d-block">
      <p className="text-center m-0"> {message} </p>
    </div>
  );
};

export default Error;
