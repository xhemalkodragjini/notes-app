import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import NoteForm from "./NoteForm";

export default function SingleNote(props) {
  return (
    <>
      <Card>
        <Card.Header>{props.note.category}</Card.Header>
        <Card.Body>
          <Card.Title>{props.note.title}</Card.Title>

          <Button variant="primary" onClick={props.handleShow}>
            More...
          </Button>
        </Card.Body>
      </Card>

      {!props.editing ? (
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.note.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.note.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={props.handleEdit}>
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => props.handleDelete(props.note)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <NoteForm
              handleSubmittedNote={props.handleSubmitChanges}
              handleCancel={props.handleEditCancel}
              disabled={props.editing}
              initialValues={props.initialValues}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
