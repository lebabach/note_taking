import React, { useEffect, useState } from 'react';
import Note from './Note';
import WarningBox from './boxes/WarningBox';

export default function NoteList({ notes, updateNotes, userLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (userLoggedIn) {
      updateNotes();
    }
  }, []);

  const filteredNotes = notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <>
        {userLoggedIn ? (
            <div id="note-list">
              <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
              />
              {filteredNotes.map((note) => (
                  <Note note={note} key={note.id} updateNotes={updateNotes} />
              ))}
            </div>
        ) : (
            <WarningBox text={'You are not logged in. Please log in to see & manage your notes.'} />
        )}
      </>
  );
}