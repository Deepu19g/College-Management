import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import db from "../FireBase";

function StudentNotif() {
  const [notif, setnotif] = useState([]);
  let notifRef = collection(db, "notification");
  useEffect(() => {
    let temp = [];
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
  }, []);
  console.log(notif);
  return (
    <div>
      <h3>Notification</h3>
      {notif.map((itm) => {
        return (
          <div
            style={{
              background: "white",
              display: "flex",
              width: "20rem",
              marginTop: "2rem",
            }}
          >
            <p
              style={{
                marginLeft: "1rem",
                fontSize: "2rem",
                background: "#2a2a53",
                color: "white",
                padding: "0.5rem",
              }}
            >
              {new Date(itm.date).getDate()}
            </p>
            <div>
              {" "}
              <p style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
                {itm.content}
              </p>
              <p style={{marginLeft:"1rem"}}> {itm.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StudentNotif;
