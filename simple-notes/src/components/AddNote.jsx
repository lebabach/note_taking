import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addNote as addNoteAPI, updateNote } from '../fetch';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddNote({ updateNotes }) {
    const location = useLocation();
    const navigate = useNavigate();
    const note = location.state?.note || {};

    const [title, setTitle] = useState(note.title || '');
    const [content, setContent] = useState(note.content || '');
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        let response;
        try {
            if (note.id) {
                response = await updateNote(note.id, title, content);
                if (response === 200) {
                    console.log('Successfully updated on server!');
                }
            } else {
                response = await addNoteAPI(title, content);
                if (response === 200) {
                    console.log('Successfully added to server!');
                }
            }

            if (response === 200) {
                updateNotes();
                navigate('/');
            } else {
                setError('Failed to save the note. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while saving the note. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                    <label style={{ flex: 1 }}>
                        Title:
                    </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 2 }} />
                </div>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                    <label style={{ flex: 1 }}>
                        Content:
                    </label>
                    <div style={{ flex: 2 }}>
                        <ReactQuill value={content} onChange={setContent} />
                    </div>
                </div>
            </div>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <div style={{ marginBottom: '1rem' }}>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

AddNote.propTypes = {
    updateNotes: PropTypes.func.isRequired
};