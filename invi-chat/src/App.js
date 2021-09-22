import React from 'react' 
import Test from './components/Test';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"; 
import Aside from './components/Aside';
import Dashboard from './components/Dashboard';


function App() {
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
