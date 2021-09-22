import React from 'react' 
import Test from './components/Test';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"; 
import Aside from './components/Aside';
import Dashboard from './components/Dashboard';
import firebase from 'firebase'; 
import auth from 'firebase/auth'; 
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyddp2vs8JJfytLxDy5t3tQswv1TT1WwE",
  authDomain: "invi-chat.firebaseapp.com",
  projectId: "invi-chat",
  storageBucket: "invi-chat.appspot.com",
  messagingSenderId: "758776663456",
  appId: "1:758776663456:web:1a438e2a7cc61eae1728c5",
  measurementId: "G-55NNVS23TK"
};

function App() {
  
  // firebase.initializeApp(firebaseConfig);
  
  let user = true; 

  if(!user) return ( 
    <div> 
        <h1> Login my gee! </h1>
    </div>
  )

  return (
    <> 

      <Router> 
      <div className="App">

        <div className="window-container"> 
          
          <div className="border-end aside"> 
            
            <Aside/>
            
            <div> 
              <nav className="navegacion"> 
                <ul className="btn btn-secondary borded-rounded py-2 boton w-100"> 
                  <Link to="/" className="link"> Inicio </Link>
                </ul>
                <ul className="btn btn-secondary borded-rounded py-2 boton w-100"> 
                  <Link to="/Test" className="link"> Test </Link>
                </ul>
                <ul className="btn btn-secondary borded-rounded py-2 boton w-100"> 
                  <Link to="/Dashboard" className="link"> Dashboard </Link>
                </ul>
              </nav>
            </div> 

          </div>

          <Switch> 
            <Route path="/Test" exact component={()=> <Test/> } > 
              <Test/>
            </Route> 
            <Route path="/Dashboard" exact component={()=> <Dashboard/> }> 
              <Dashboard/>
            </Route>
          </Switch>

        </div>
        
        


      </div> 

        
      </Router>
    </>
    
  );
}


 
export default App;
