// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyB8MU9-fjNafEg9MJQ9O8tlSL6H6HD2avg",
  authDomain: "filestoresapp.firebaseapp.com",
  projectId: "filestoresapp",
  storageBucket: "filestoresapp.appspot.com",
  messagingSenderId: "219599540367",
  appId: "1:219599540367:web:47228641993278ddf360fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const store = getStorage()

