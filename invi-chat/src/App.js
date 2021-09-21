import React from 'react' 
import Test from './components/Test';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"; 
import Aside from './components/Aside';


function App() {
  return (
    <> 
      <Router> 
      <div className="App">

        <div className="window-container"> 
          
          <div className="border-end aside"> 
            
            <Aside/>
            
            <div> 
              <nav> 
                <ul> 
                  <Link to="/"> Inicio </Link>
                </ul>
                <ul> 
                  <Link to="/Test"> Test </Link>
                </ul>
                <ul> 
                  <Link to="/Dashboard"> Dashboard </Link>
                </ul>
              </nav>
            </div> 

          </div>

          <Switch> 
            <Route path="/Test" exact component={()=> <Test/> } > 
              <Test/>
            </Route>
          </Switch>

        </div>
        
        


      </div> 

        
      </Router>
    </>
    
  );
}


 
export default App;
