import React, { useEffect, useState } from "react";
import { query, collection,  getDocs } from "firebase/firestore";
import db from "../FireBase";
import {  Col, Row } from "react-bootstrap";
import StudentCard from "./StudentCard";
import committeeLogo from "../images/commitee-lg.png";
function AdminStudent() {
  const sRef = collection(db, "student");
  const mRef = collection(db, "marks");
  const [data, setdata] = useState();
  const [count,setcount] = useState(0)
 
  useEffect(() => {
    let student = [];
    getDocs(sRef).then((itm) => {
      console.log(itm);
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          student = [...student, doc.data()];
        });
      } else {
        setdata({});
      }
    });
    getDocs(mRef).then((itm) => {
      if (itm.size !== 0) {
        let i = 0;
        itm.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          student[i].marks = doc.data();
          i = i + 1;
        });
       
        setcount(i)
        setdata(student);
      }
    });
  }, []);

  return (
    <Row>
      <Col className="leftside" md={2}>
        <p>
          <span className="pageimageholder" style={{ border: "1px solid" }}>
            <img style={{ marginTop: "40px" }} src={committeeLogo} alt="" />
          </span>
        </p>
        <p className="page-title">Student</p>
        <p>
          No. of students:{count} <b></b>
        </p>
       
      </Col>

      <Col
        md={9}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row>
          {data !== undefined &&
            data.map((itm, index) => {
              return <StudentCard data={itm} key={index}></StudentCard>;
            })}
        </Row>
      </Col>
    </Row>
  );
}

export default AdminStudent;
