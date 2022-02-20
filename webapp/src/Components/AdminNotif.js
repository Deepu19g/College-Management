import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import db from "../FireBase";
import {Row,Col,Button} from "react-bootstrap"
import BasicModal from "./Modal"
function AdminNotif() {
  const [notif, setnotif] = useState([]);
  const [open, setOpen] = React.useState(false);
 
  let notifRef = collection(db, "notification");

  let load=async()=>{
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
  }
  useEffect(() => {
   
   
    load()
  }, []);
  console.log(notif);
  return (
      <div>
    <h3>Notification</h3>
    <Row style={{alignItems:"center"}}>
      
      <Col md={2}><Button style={{width:"8rem",marginLeft:"2rem"}} onClick={()=>setOpen(true)}>Add</Button></Col>
      <BasicModal open={open} setOpen={setOpen} load={load} ></BasicModal>
      <Col >
      {notif.map((itm,index) => {
        return (
          <div
            style={{
              background: "white",
              display: "flex",
              width: "20rem",
              marginTop: "2rem",
            }}
            key={index}
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
      </Col>
    </Row>
    </div>
  );
}

export default AdminNotif