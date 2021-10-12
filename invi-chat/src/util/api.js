import axios from "axios";

const callLogin = (formData) => {
  axios.post("/login", {
    Headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    email: formData.email,
    password: formData.password,
  });
};

export { callLogin };
