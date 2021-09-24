// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp();

// exports.test = functions.https.onRequest((request, response) => {
//     response.send('Test');
// });

// exports.getScreams = functions.https.onRequest((req, res) => {
//     admin.firestore()
//     .collection('screams')
//     .get()
//     .then(data => {
//         let screams = [];
//         data.forEach(doc => {
//             screams.push(doc.data());
//         });
//         return resizeBy.json(screams)
//     })
//     .catch(err => console.error(err));
// });