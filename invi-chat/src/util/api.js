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

const verifyToken = (token) => {
  const authHeader = `Bearer ${token}`;
  return axios({
    method: "GET",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    url: "/verifyToken",
  });
};

export { callLogin, verifyToken };
