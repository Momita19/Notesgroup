'use client';
import React, { useState, useEffect } from 'react';
import PopupForm from './Form'; // Adjust the import path if necessary
import Styles from './Sidebar.module.css';
import axios from 'axios'
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  // Static hardcoded notes
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  // const [notes, setNotes] = useState([
  //   { id: 1, title: 'Note 1' },
  //   { id: 2, title: 'Note 2' },
  //   { id: 3, title: 'Note 3' },
  //   { id: 4, title: 'Note 4' },
  // ]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/notes')
        console.log(response.data, "response")
        setNotes(response.data);
        // const group = response.groupName
        // setNotes(response.data);
        // console.log(notes, "notes")
        
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);
  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  const handleSelectGroup = (notes) => {
    setSelectedNote(notes);
    // Redirect to the group's page by ID
    router.push(`/group/${notes.id}`);
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
        {notes.map((notes) => (
          <li 
            key={notes._id} 
            onClick={() => handleSelectGroup(notes)}
            className='text-black'
          >
            {notes.groupName}
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
