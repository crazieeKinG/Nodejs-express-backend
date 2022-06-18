const firebase_app = require('firebase-admin');
const serviceAccount = require('./simpleblog_sdk.json');

firebase_app.initializeApp({
    credential: firebase_app.credential.cert(serviceAccount)
});

const db = firebase_app.firestore();

module.exports = db;