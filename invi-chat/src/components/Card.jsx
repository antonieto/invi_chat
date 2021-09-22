import React from 'react' 

const Card = ({info}) => {
    return (  
        <div className="container"> 
            <div className="row"> 
                <div className="card evento p-4 shadow border-rounded"> 
                    <h2> {info.title} </h2>
                    <h4> {info.guests} </h4>
                    <h4> {info.date} </h4>
                </div>
                <div className="card evento p-4 shadow border-rounded"> 
                    <h2> {info.title} </h2>
                    <h4> {info.guests} </h4>
                    <h4> {info.date} </h4>
                </div>
                <div className="card evento p-4 shadow border-rounded"> 
                    <h2> {info.title} </h2>
                    <h4> {info.guests} </h4>
                    <h4> {info.date} </h4>
                </div>
            
            </div>

        </div>
    );
}
 
export default Card;