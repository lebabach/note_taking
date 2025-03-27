import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeNote } from '../fetch';
import ReactMarkdown from 'react-markdown';

export default function Note({ note, updateNotes }) {
    const navigate = useNavigate();

    async function removeNoteHandler() {
        const response = await removeNote(note.id);
        if (response === 200) {
            console.log('Successfully removed from server!');
            updateNotes();
        }
    }

    function updateNoteHandler() {
        navigate('/add-note', { state: { note } });
    }

    return (
        <div className="note-container">
            <h2>{note.title}</h2>
            <button onClick={removeNoteHandler}>Remove</button>
            <button onClick={updateNoteHandler}>Edit</button>
        </div>
    );
}