import React from "react";

const Error = ({ message }) => {
  if (!message.trim()) return null;
  return (
    <div className="alert alert-danger w-100">
      <p className="text-center"> {message} </p>
    </div>
  );
};

export default Error;
