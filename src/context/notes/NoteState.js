import NoteContext from "./noteContext";
import { useState } from "react";
import Notes from "../../components/Notes";

const NoteState = (props) => {
  const showAlert = props.showAlert;
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    })
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json();
    setNotes(notes.concat(note));
    showAlert("NOte added successfully","success" ,'Success');
  }
  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json();
    console.log("deleted" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes);
    showAlert("NOte deleted successfully","danger",'Success');
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    showAlert("Note updated successfully","success",'Success');
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      <Notes alert = {showAlert}/>
    </NoteContext.Provider>
  )
}

export default NoteState;