import React from 'react'
import Card from '../components/Card';
import info from '../info.json';

const Dashboard = () => {
    
    return ( 
        <div className=" p-4">
           <Card info={info}/>  

        </div>
     );
}
 
export default Dashboard;