// firebase.js

import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB8MU9-fjNafEg9MJQ9O8tlSL6H6HD2avg",
    authDomain: "filestoresapp.firebaseapp.com",
    projectId: "filestoresapp",
    storageBucket: "filestoresapp.appspot.com",
    messagingSenderId: "219599540367",
    appId: "1:219599540367:web:47228641993278ddf360fa"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase as default };