import React,{useEffect,useState} from 'react'
import {
    collection,
    
    onSnapshot,
    getDocs,
    getDoc,
  } from "firebase/firestore";
  import db from "../FireBase";

function StudentNotif() {
    const [notif,setnotif] = useState([])
    let notifRef=collection(db,"notification")
    useEffect(()=>{
        let temp=[]
        getDocs(notifRef).then((itm) => {
            //console.log(itm);
            if (itm.size !== 0) {
              itm.forEach((doc) => {
                temp = [...temp, doc.data()];
              });
              setnotif(temp);
            } else {
              //setdata({});
            }
          });
    },[])
    console.log(notif)
  return (
    <div>StudentNotif</div>
  )
}

export default StudentNotif