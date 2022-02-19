import React from "react";
import {Card,Col} from 'react-bootstrap'
function StudentCard({data}) {
  return (
    <Col md={3} style={{marginLeft:"0.8rem"}}>
      {Object.keys(data).length !== 0 ? (
        <Card
          style={{
            width: "18rem",
            height: "21rem",
            marginTop: "5rem",
            borderRadius: "25",
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>{data.name}</Card.Title>
            <Card.Text style={{ fontWeight: "500", textAlign: "center" }}>
              <p>CLASS-{data.class}</p>
              <p>REG NO-{data.Regno}</p>
              <p>SGPA</p>
              <p>SEM 1-{data.marks.sem1Mark}</p>
              <p>SEM 2-{data.marks.sem2Mark}</p>
              <p>SEM 3-{data.marks.sem3Mark}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card
          style={{
            width: "18rem",
            height: "21rem",
            marginTop: "5rem",
            borderRadius: "25",
          }}
        >
          <Card.Body>
            <Card.Text style={{ fontWeight: "500", textAlign: "center" }}>
              <p>No students found</p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
}

export default StudentCard;
