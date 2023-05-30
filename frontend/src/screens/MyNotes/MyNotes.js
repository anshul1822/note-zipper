import React, { useEffect } from "react";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import {useDispatch, useSelector} from 'react-redux';
import { listNotes } from "../../actions/noteActions";
import { deleteNoteAction } from "../../actions/noteActions";
import  Loading  from "../../components/Loading"
import  ErrorMessage  from "../../components/ErrorMessage"

function MyNotes({search}) {

  const dispatch = useDispatch();

  const noteList = useSelector(state => state.noteList);
  console.log(noteList);
  const {loading, notes, error} = noteList;

  console.log(loading, error, notes);

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const {success : successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const {success : successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {success : successDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/mynotes");
  };

  const history = useHistory();

  useEffect(()=>{
    dispatch(listNotes());
    if(!userInfo){
      history.push("/");
    }
  }, [dispatch, successCreate, history, userInfo, successUpdate, successDelete]);

  return (
    <MainScreen title={`Welcome ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
      {loading && <Loading/>}
      {
      notes && notes
      .filter((filtered) => {
        return filtered.title.toLowerCase().includes(search.toLowerCase())
      })
      .reverse()
      .map((note) => {
        return <Accordion key={note._id}>
        <Card style={{ margin: 10 }}>
          <Card.Header style={{ display: "flex" }}>
            <span
              style={{
                color: "black",
                textDecoration: "none",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 18,
              }}
            >
              <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                {note.title }
              </Accordion.Toggle>
            </span>

            <div>
              <Button href={`/note/${note._id}`}> Edit </Button>
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => deleteHandler(note._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <h4>
                <Badge style={{ backgroundColor: "#28a745" }}>
                  Category - {note.category}
                </Badge>
              </h4>

              <blockquote>
                <p className="blockquote mb-0">
                  {note.content}
                </p>
                <footer className="blockquote-footer">
                  Created on{" "}
                  <cite title="Source Title">
                    {note.createdAt.substring(0,10)}
                  </cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      } )}
    </MainScreen>
  );
}

export default MyNotes;
