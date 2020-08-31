import React, { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import * as uuid from "uuid";
import { Container, Row, Col, Button } from "react-bootstrap";
import SingleNote from "./components/SingleNote";

function App() {
  // State Hooks
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(false);

  const [isClicked, setIsClicked] = useState(false);
  const [filter, setFilter] = useState("");
  const [select, setSelect] = useState("asc");

  // Filtering
  useEffect(() => {
    // filtered notes me filter keyword
    const filteredList = notes.filter((note) => note.title.includes(filter));
    setFilteredNotes(filteredList);
  }, [notes, filter]);

  // Sorting
  useLayoutEffect(() => {
    let sortedList;
    // eslint-disable-next-line default-case
    switch (select) {
      case "asc":
        sortedList = filteredNotes.sort((note1, note2) =>
          note1.title > note2.title ? -1 : 1
        );
        break;
      case "desc":
        sortedList = filteredNotes.sort((note1, note2) =>
          note1.title < note2.title ? -1 : 1
        );
        break;
    }
    setFilteredNotes(sortedList);
  }, [filteredNotes, select]);

  // Event Handlers
  const handleClose = () => {
    setShow(false);
    setEditing(false);
  };

  const handleShow = () => {
    setShow(true);
    setIsClicked(false);
  };
  const handleEdit = () => setEditing(true);

  function handleAdd() {
    setIsClicked(true);
  }

  function handleCancel() {
    setIsClicked(false);
  }
  function handleSubmittedNote(note) {
    note.id = uuid.v4();
    setShow(false);
    setNotes([...notes, note]);
  }

  function handleEditCancel() {
    setEditing(false);
  }

  function handleDelete(note) {
    const newNotes = notes.filter((noteIndex) => noteIndex.id !== note.id);
    setShow(false);
    setNotes(newNotes);
  }

  function handleSubmitChanges(note) {
    let newEdittedNotes = [...notes];
    const index = newEdittedNotes.findIndex(
      (oldNote) => oldNote.id === note.id
    );
    newEdittedNotes[index] = note;
    setNotes(newEdittedNotes);

    setEditing(false);
  }

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  function handleSelect(event) {
    setSelect(event.target.value);
  }
  return (
    <Container className="App">
      <Row>
        <Col className="column">
          <div className="logo">Notes App</div>
          <div>
            <Button className="add-button" onClick={handleAdd}>
              Add new Note
            </Button>
          </div>
          {isClicked ? (
            <NoteForm
              handleSubmittedNote={handleSubmittedNote}
              handleCancel={handleCancel}
              disabled={editing}
              initialValues={{
                title: "",
                description: "",
                category: "General",
              }}
            />
          ) : (
            <div></div>
          )}
        </Col>
        <Col>
          <Row className="filter">
            <Col>
              <input
                type="text"
                placeholder="Filter by title"
                value={filter}
                onChange={handleFilter}
              />
            </Col>
            <Col>
              <select value={select} onChange={handleSelect}>
                <option value="asc">Sort: Ascending</option>
                <option value="desc">Sort: Descending</option>
              </select>
            </Col>
          </Row>
          {filteredNotes.map((note) => (
            <div className="single-note">
              <SingleNote
                key={note.id}
                note={note}
                editing={editing}
                show={show}
                handleShow={handleShow}
                handleClose={handleClose}
                handleEdit={handleEdit}
                initialValues={{
                  title: note.title,
                  description: note.description,
                  category: note.category,
                  id: note.id,
                }}
                handleEditCancel={handleEditCancel}
                handleDelete={handleDelete}
                handleSubmitChanges={handleSubmitChanges}
              />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
