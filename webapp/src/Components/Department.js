import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import departmentLogo from "../images/department-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import vector from "../images/Vector.png";
import { collection, getDocs } from "firebase/firestore";
import db from "../FireBase";

function Department() {
  const [data, setdata] = useState([]);
  const [depCount,setdepCount] = useState(0)
  const [teacherCount,setteacherCount] = useState(0)
  /*async function getCount() {
    try {
      const doc = await fetch("/api/department/count");
      const { noOfDepartments, noOfFaculties, noOfStudents } = await doc.json();
      setDepartmentNo(noOfDepartments);
      setFacultyNo(noOfFaculties);
      setStudentNo(noOfStudents);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDepartments() {
    try {
      const doc = await fetch(`/api/department?tag=${tag}&order=${order}`);
      const departments = await doc.json();
      setDepartments(departments);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchVal !== "") {
      const doc = await fetch(
        `/api/department/search?tag=${tag}&filter=${searchVal}`
      );
      const result = await doc.json();
      setDepartments(result);
    } else {
      const doc = await fetch(`/api/department?tag=dname`);
      const result = await doc.json();
      setDepartments(result);
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

  useEffect(() => {
    const depRef = collection(db, "department");
    let temp = [];
    let deptcount=0,teacherno=0;
    let getdata = async () => {
      const querySnapshot = await getDocs(depRef);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp = [...temp, doc.data()];
        deptcount=deptcount+1;
        teacherno=teacherno+doc.data().Teachercount
        
      });
      setdata(temp);
      setdepCount(deptcount);
      setteacherCount(teacherno)
    };
    getdata();
  }, []);
  
  return (
    <>
      <div>
        <Row>
          <Col className="leftside" md={2}>
            <p>
              <span
                className="pageimageholder"
                style={{ marginTop: "40px", border: "1px solid" }}
              >
                <img
                  style={{ marginTop: "40px" }}
                  src={departmentLogo}
                  alt=""
                />
              </span>
            </p>
            <p className="page-title">DEPARTMENTS</p>
            <p>
              No. of departments: <b></b>{depCount}<br></br>
           
            
            </p>
          </Col>
          {/* <Col md={1}></Col> */}
          <Col md={9}>
            <Row style={{height:"100%"}}>
              {data.map((itm) => {
                return (
                  <Col md={4} style={{background:"white",borderRadius:"25",width:"5rem",height:"15rem",marginLeft:"1rem",marginTop:"1rem"}} className="Deptcards">
                    <p style={{textAlign:"center",fontSize:"1.4rem"}}>{itm.Name}</p>
                    <p style={{textAlign:"center"}}>HOD-{itm.HOD}</p>
                    <p style={{textAlign:"center"}}>Strength-{itm.Staffcount}</p>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Department;
