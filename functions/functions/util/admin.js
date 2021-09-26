const admin = require('firebase-admin');  
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://social-net-test-ed91f.firebaseio.com'
}); 
const db = admin.firestore(); 

module.exports = {admin, db};