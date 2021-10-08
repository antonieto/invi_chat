import React from "react";

const Formulario = () => {
  const data = {
    email: "carlo2@carlo.com",
    password: "123456",
    confirmPassword: "123456",
    handle: "carlo2",
  };
  const handleSubmit = (e) => {
    fetch("http://localhost:5001/invi-chat/us-central1/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      const { token, msg } = response;
      console.log(token);
    });
  };

  return <div></div>;
};

export default Formulario;
