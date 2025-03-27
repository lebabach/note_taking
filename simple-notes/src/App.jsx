import { useState, useEffect } from 'react'
import './App.css'
import NoteList from './components/NoteList'
import AddNote from './components/AddNote'
import Layout from './components/Layout'
import Login from './components/Login'
import Register from './components/Register'
import { fetchNotes } from './fetch'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Snackbar } from '@mui/material'

function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (userLoggedIn) {
      async function getNotes() {
        setNotes(await fetchNotes());
      }
      getNotes();
    }
  }, [])

  const updateNotes = async () => {
    console.log('fetching')
    setNotes(await fetchNotes());
  }

  useEffect(() => {
    setUserLoggedIn(localStorage.getItem('token') != null);
  }, [])

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  
  const handleCloseSnackBar = (event, reason) => {
    setSnackBarOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<Layout userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />}>
                <Route index element={<NoteList notes={notes} updateNotes={updateNotes} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />} />
                <Route path="add-note" element={<AddNote notes={notes} updateNotes={updateNotes} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />} />
                <Route path="login" element={<Login setUserLoggedIn={setUserLoggedIn} setSnackBarOpen={setSnackBarOpen} setSnackMessage={setSnackMessage} /> } />
                <Route path="register" element={<Register/> } />
              </Route>
        </Routes>
      </BrowserRouter>
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
        message={snackMessage}
      />
    </>
  )
}

export default App
