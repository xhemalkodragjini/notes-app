import { React, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

export default function Note(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card>
        <Card.Header>{props.note.category}</Card.Header>
        <Card.Body>
          <Card.Title>{props.note.title}</Card.Title>

          <Button variant="primary" onClick={handleShow}>
            More...
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.note.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.note.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
