const functions = require("firebase-functions");

const app = require('express')(); 

const { signUp } = require('./handlers/users');


// User routes 
app.post('/signup', signUp);

// app.get('/get', (req, res)=> { 
    
// })

exports.api = functions.https.onRequest(app);