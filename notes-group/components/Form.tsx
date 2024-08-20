// components/PopupForm.js
import React, { useState, useRef, useEffect } from 'react';
import styles from './Sidebar.module.css'

const PopupForm = ({ onCreateGroup, onClose }: any) => {
  const [groupName, setGroupName] = useState('');
  const modalRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreate = async () => {
    if (groupName.trim()) {
      try {
        const response = await fetch('http://localhost:3001/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groupName }),
        });

        if (response.ok) {
          const data = await response.json();
          onCreateGroup(data); 
          setGroupName('');
          setSuccessMessage('Group created successfully!');
          setErrorMessage('');
          setTimeout(() => {
            onClose();
          }, 2000); // Close the modal after 2 seconds
        } else {
          const errorData = await response.json();
          setErrorMessage(`Failed to create group: ${errorData.message}`);
        }
      } catch (error) {
        setErrorMessage(`Error: ${error.message}`);
      }
    }
  };
  const handleClickOutside = (event: any) => {
    if(modalRef.current && !modalRef.current.contains(event.target)){
        onClose();
    }
  }

  // http://localhost:3001/api/notes
  useEffect(() => {
    // Add event listener for detecting outside clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalRef}>
        <h3>Create New Group</h3>
        <input 
          type="text" 
          value={groupName} 
          onChange={(e) => setGroupName(e.target.value)} 
          placeholder="Group Name" 
        />
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Cancel</button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default PopupForm;
