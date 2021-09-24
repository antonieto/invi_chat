import React from 'react'; 
import img from '../img/no-img.png';


const Aside = () => {
    return ( 
        <div> 
            <img src={img} alt="no-user" className="aside-user" style={{width: "7.5rem"}} />
            <h3 className="text-center text-light mt-4"> Cuenta </h3>
        </div>
     );
}
 
export default Aside;