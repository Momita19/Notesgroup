'use client';
import React, { useState } from 'react';
import PopupForm from './Form'; // Adjust the import path if necessary
import Styles from './Sidebar.module.css';

const Sidebar = () => {
  // Static hardcoded notes
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1' },
    { id: 2, title: 'Note 2' },
    { id: 3, title: 'Note 3' },
    { id: 4, title: 'Note 4' },
  ]);

  const [selectedNote, setSelectedNote] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  const handleCreateNote = (noteTitle) => {
    const newNote = {
      id: notes.length + 1,
      title: noteTitle,
    };
    setNotes([...notes, newNote]);
    setShowForm(false);
  };

  return (
    <div className={Styles.sidebar}>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li 
            key={note.id} 
            onClick={() => handleSelectNote(note)}
            className={Styles.note}
          >
            {note.title}
          </li>
        ))}
      </ul>
      <button className={Styles.addNote} onClick={() => setShowForm(true)}>+ Add Note</button>

      {showForm && (
        <PopupForm 
          onCreateNote={handleCreateNote} 
          onClose={() => setShowForm(false)} 
          // onCreateGroup={(group) => console.log('Group created:', group)}
        />
      )}

      <div className="content">
        {selectedNote ? (
          <div>
            <h2>{selectedNote.title}</h2>
            <p>Note content goes here...</p>
          </div>
        ) : (
          <p>Select a note to view its content</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
