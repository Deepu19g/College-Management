import  React,{useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Form } from "react-bootstrap";
import { addDoc, Timestamp, doc ,collection} from "firebase/firestore";
import db from "../FireBase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen,load }) {
  const [Sdata,setSdata] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  let handleSubmit = async(e) => {
    e.preventDefault();
    let data = {
      content: e.target.content.value,
      date: new Date(e.target.date.value).toDateString() ,
    };
//console.log(data);
    const nRef = await addDoc(collection(db, "notification"), data);
    handleClose()
    load()
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Content"
                name="content"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="date" name="date" />
            </Form.Group>

            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}
