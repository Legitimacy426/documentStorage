"use client"

import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";

import { useRouter } from "next/navigation";
import { auth } from "./firebaseConfig";




export const useAuthenticate = async () =>{

  const router = useRouter()
   onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const role = localStorage.getItem("role")
        console.log(uid)
        return {userId:uid,role:role}
        
        // ...
      } else {
        // User is signed out
        // ...
  router.push('../')
        console.log('not logged in')


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