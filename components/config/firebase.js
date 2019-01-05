import  {API_KEY, AUTHDOMAIN, DATABASE_URL,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID}  from 'react-native-dotenv'

//firebase configuration
const firebase = require('firebase/app')
require('firebase/auth');
require('firebase/database');
require('firebase/storage');


var config = {
  apiKey: API_KEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};
firebase.initializeApp(config);
console.log(API_KEY)
var Firebase = firebase
export default Firebase;