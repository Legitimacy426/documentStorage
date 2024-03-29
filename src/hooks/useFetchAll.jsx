

import { useEffect, useState } from "react";


import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/libs/firebaseConfig";


const useFetchAll = (tag,fil) => {


const [cards, setCards] = useState([]);
const [isErrorC, setError] = useState(null);
const [isPendingC, setPendingC] = useState(true);

    useEffect(() => {
   
    const Cards = [];
      let q;
      const userRef = collection(db, tag);
      q = query(
        userRef,
       );
      if(fil != undefined){
        q = query(
          userRef,
          where('folderName','==',fil)
         );
       console.log(fil)
       console.log('1111111111111111111111111')
      }
      
   
    getDocs(q)
      .then((users) => {
        users.forEach((user) => {
          Cards.push({ ...user.data(), id: user.id });
        });
        setCards(Cards);
        setPendingC(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError(e.message);
      });
  }, [tag,fil]);
  return { cards, isErrorC, isPendingC };
};
export default useFetchAll;