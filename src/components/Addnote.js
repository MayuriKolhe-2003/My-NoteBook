import React, { useState, useContext,useRef } from 'react'
import noteContext from "../context/notes/noteContext"

const Addnote = () => {
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    refClose.current.click();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
               Add a Note
            </button>
            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add a Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form >
                    <div className="form-group mb-3">
                      <label className="label" for="name">Title</label>
                      <input type="text" name="title" className="form-control" placeholder="title" required onChange={onChange} value={note.title} />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" for="password">Description</label>
                      <input type="text" name="description" value={note.description} className="form-control" placeholder="Description" required onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" for="password">Tag</label>
                      <input type="text" name="tag" value={note.tag} className="form-control" placeholder="tag" required onChange={onChange} />
                    </div>
                    
                  </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className=" btn btn-primary rounded submit px-3" onClick={handleClick}>Add NOte</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

  )
}

export default Addnote
