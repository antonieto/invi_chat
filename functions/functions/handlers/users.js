// Aquí deben de ir las funciones de Login y Signup 

const { db } = require('../util/admin');



exports.signUp = (req, res)=>{
    return res.status(200).json({msg: "Desde signUp"}); 

    const newUser = { 
        email: req.body.email, 
        password: req.body.password, 
        confirmPassword: req.body.password, 
        handle: req.body.handle
    }    

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get() 
    .then( doc => { 
        if(doc.exists){
            return res.status(400).json({error: 'Handle alrleady taken'});
        } else { 
            return 
        }
    }) 


} 

// Login