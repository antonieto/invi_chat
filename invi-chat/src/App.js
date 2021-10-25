import React, { useEffect, useState } from "react";
import "axios";

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

function App() {
  // State de user
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  let history = useHistory();

  useEffect(() => {
    console.log(history);
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
    // Login here
    // return <Login setUser={setUser} setToken={setToken} />;
  }

  // Return app

  return (
    <Router>
      <Route path="/" exact>
        <Dashboard user={user} token={token} />
      </Route>

      <Route path="/meeting/:meetingId" exact>
        <Meeting />
      </Route>
    </Router>
  );
}

export default App;
