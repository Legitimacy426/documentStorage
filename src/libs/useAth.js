"use client"

import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";

import { redirect, useRouter } from "next/navigation";
import { auth } from "./firebaseConfig";




export const useAuthenticate = async () =>{

  
   onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
      
        return {userId:uid}
        
        // ...
      } else {
        // User is signed out
        // ...

        console.log('not logged in')
       redirect('../')

      }
    });
}


export const signout = () =>{

  signOut(auth).then(() => {
    router.push(domainp)
  }).catch((error) => {
return(<h1>loading....</h1>)
  });
}