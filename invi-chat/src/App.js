import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

// Pages imports
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NoUser from "./pages/NoUser";
import SignUp from "./pages/SignUp.jsx";
import Meeting from "./pages/Meeting";
import { verifyToken } from "./util/api";

// Components
import Nav from "./components/Nav";

function App() {
  // State de user
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  let history = useHistory();

  useEffect(() => {
    if (token)
      verifyToken(token)
        .then()
        .catch((err) => {
          if (err.response.status === 403) {
            setToken(null);
            setUser(null);
          }
        });
  }, [user]);

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
  }

  // Return app

  return (
    <Router>
      <Nav />
      <Switch></Switch>
      <Route path="/" exact>
        <Dashboard user={user} token={token} />
      </Route>

      <Route path="/meeting/:meetingId" exact>
        <Meeting token={token} user={user} />
      </Route>
    </Router>
  );
}

export default App;
