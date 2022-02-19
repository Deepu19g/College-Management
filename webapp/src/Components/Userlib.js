import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import _ from "lodash";
import libraryLogo from "../images/library-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import book from "../images/book.png";
import { Link } from "react-router-dom";
import { collection, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import db from "../FireBase";

function UserLib() {
  const [tag, setTag] = useState("bname");
  const [order, setOrder] = useState("1");
  const [noOfBooks, setBookNo] = useState(0);
  const [noOfAuthors, setAuthorNo] = useState(0);
  const [noOfEditions, setEditionNo] = useState(0);
  const [books, setBooks] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const LRef = collection(db, "library");
  const [Books, setbooks] = useState([]);
  async function getCount() {
    try {
      const doc = await fetch("/api/library/count");
      const { noOfBooks, noOfAuthors, noOfEditions } = await doc.json();
      setBookNo(noOfBooks);
      setAuthorNo(noOfAuthors);
      setEditionNo(noOfEditions);
    } catch (err) {
      console.log(err);
    }
  }

  async function getBooks() {
    try {
      const doc = await fetch(`/api/library?tag=${tag}&order=${order}`);

      const books = await doc.json();
      console.log({ doc: books });
      setBooks(books);
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
        `/api/library/search?tag=${tag}&filter=${searchVal}`
      );
      const result = await doc.json();
      setBooks(result);
    } else {
      const doc = await fetch(`/api/library?tag=bname`);
      const result = await doc.json();
      setBooks(result);
    }
  };
  const handleKeyDown = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") handleSubmit(e);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (order === "1") setOrder("-1");
    else setOrder("1");
  };

  const handleDelete = async (el) => {
    try {
      await fetch(
        `api/library/delete?bname=${el.bname}&edition=${el.edition}`,
        {
          method: "POST",
        }
      );
      const updatedBooks = _.remove(books, function (n) {
        return n.bname === el.bname;
      });
      setBooks(updatedBooks);
    } catch (err) {}
  };

  useEffect(() => {
    let books = [];
    getDocs(LRef).then((itm) => {
      //console.log(itm);
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          books = [...books, doc.data()];
        });
        setbooks(books);
      } else {
        //setdata({});
      }
    });
  }, []);

  console.log(Books);
  return (
    <div>
      <Row>
        <Col className="leftside" md={2}>
          <p>
            <span
              className="pageimageholder"
              style={{ marginTop: "40px", border: "1px solid" }}
            >
              <img style={{ marginTop: "40px" }} src={libraryLogo} alt="" />
            </span>
          </p>
          <p className="page-title">LIBRARY</p>
          
          <br></br>
          
        </Col>
        {/* <Col md={1}></Col> */}
        <Col className="rightside" md={8}>
          <Row>
            <input
              className="search"
              type="text"
              placeholder="Search"
              value={searchVal}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              style={{ border: "1px solid" }}
            />
            <buttton onClick={handleOrder}>
              <img src={switchOrder} alt=""></img>{" "}
            </buttton>
          </Row>
          <hr></hr>
          {/* MAIN */}
          <Row className="homerow justify-content-md-center">
            {Books.length > 0 &&
              Books.map((el, id) => (
                <Col
                  md={3}
                  key={id}
                  className="pagegrid"
                  style={{ border: "1px solid" }}
                >
                  <Row>
                    <Col md={1}>
                      <span>
                        <img style={{ marginTop: "30px" }} src={book} alt="" />
                      </span>
                    </Col>
                    <Col>
                      <br></br>
                      
                      <p className="grid-title ">{el.name}</p>
                      <span style={{ float: "right" }}> - {el.author}</span>
                    </Col>
                  </Row>
                  <p style={{ position: "absolute", bottom: "0" }}>
                    No of books: {el.no}
                  </p>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default UserLib;
