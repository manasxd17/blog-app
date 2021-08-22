import firebase from 'firebase';
import config from './config';
import 'firebase/auth';

var provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.firestore();
export {auth,provider,db} 