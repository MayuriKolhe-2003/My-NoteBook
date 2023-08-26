import React,{useContext} from 'react'
import noteContext  from "../context/notes/noteContext"

const Noteitem = (props) => {
    const { note,updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

    return (
        <div className="col-md-10">
            <div className="card my-3 border-warning">
                <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title"><strong>Title : </strong>{note.title}</h5>
                    <div className='icon  text-warning'>
                    <i className="fas fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fas fa-edit mx-2"  onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
                <p className="card-text"><strong>Description : </strong>{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem