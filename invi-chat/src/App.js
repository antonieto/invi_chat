import React, { useEffect, useState } from "react";
import "axios";
// import axios from "axios";
// import useAuth from "react-firebase-hooks/auth";
// import Test from './components/Test';
// import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
// import Aside from './components/Aside';
// import Dashboard from './components/Dashboard';
// import firebase from 'firebase';
// import auth from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
import Login from "./pages/Login";
// import Formulario from './pages/SignUp';
// import SignUp from './pages/SignUp.jsx'

const firebaseConfig = {
  apiKey: "AIzaSyCyddp2vs8JJfytLxDy5t3tQswv1TT1WwE",
  authDomain: "invi-chat.firebaseapp.com",
  projectId: "invi-chat",
  storageBucket: "invi-chat.appspot.com",
  messagingSenderId: "758776663456",
  appId: "1:758776663456:web:1a438e2a7cc61eae1728c5",
  measurementId: "G-55NNVS23TK",
};

function App() {
  // const [users, setUsers] = useState([]);

  // State de user
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  if (!user) {
    // Login here
    return <Login setUser={setUser} setToken={setToken} />;
  }
  return <h1> You are logged in, {user.handle} </h1>;
}

export default App;
