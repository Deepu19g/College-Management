import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import committeeLogo from "../images/commitee-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import bulb from "../images/bulb.png";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";
import db from "../FireBase";
import StudentCard from "./StudentCard";

function Students() {
  const [sno, setsno] = useState("");
  const [data, setdata] = useState({});
  const [searched, setsearched] = useState(false);
  const sRef = collection(db, "student");
  const mRef = collection(db, "marks");
  let email = localStorage.getItem(`student`);

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchVal !== "") {
      const doc = await fetch(
        `/api/committee/search?tag=${tag}&filter=${searchVal}`
      );
      const result = await doc.json();
      setCommittees(result);
    } else {
      const doc = await fetch(`/api/committee?tag=cname`);
      const result = await doc.json();
      setCommittees(result);
    }
  };
  const handleKeyDown = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") handleSubmit(e);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (order === "1") setOrder("-1");
    else setOrder("1");
  };*/
  let handleClick = () => {
    let student = {};
    setsearched(true);
    const q = query(sRef, where("email", "==", `${email}`));
    const q2 = query(mRef, where("email", "==", `${email}`));
    getDocs(q).then((itm) => {
      console.log(itm);
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          student = {
            ...doc.data(),
          };
        });
      } else {
        setdata({});
      }
    });
    getDocs(q2).then((itm) => {
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          student.marks = doc.data();
        });
        console.log(student);
        setdata(student);
      }
    });
  };

  useEffect(() => {
    handleClick();
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
        
      </Col>

      <Col
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StudentCard data={data}></StudentCard>
      </Col>
    </Row>
  );
}

export default Students;
