import React, { useContext } from 'react'
import NoteState from '../context/notes/NoteState'
import Notes from './Notes'


const Home = (props) => {
  const showAlert = props.showAlert;
  return (

    <NoteState showAlert={showAlert} />

  )
}

export default Home
