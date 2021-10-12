import React, { useEffect, useState } from "react";
import "axios";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

// Pages imports
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NoUser from "./pages/NoUser";
import SignUp from "./pages/SignUp.jsx";

function App() {
  // State de user
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <Router>
        <Route path="/" exact>
          <NoUser />
        </Route>
        <Route path="/login" exact>
          <Login setToken={setToken} setUser={setUser} />
        </Route>
        <Route path="/signup" exact>
          <SignUp setToken={setToken} setUser={setUser} />
        </Route>
      </Router>
    );
    // Login here
    // return <Login setUser={setUser} setToken={setToken} />;
  }

  // Return app

  return (
    <Router>
      <div>
        <Dashboard user={user} token={token} />
      </div>
    </Router>
  );
}

export default App;
