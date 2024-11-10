// src/components/Modal.tsx
import React, { useState } from 'react';
import './Modal.css'; // You will create this CSS file for styling
import Loader from './Loader';
import { createDate } from '../services/api';

interface ModalProps {
  date: string;
  onClose: () => void;
  // onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ date, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const onConfirm = async () => {
        console.log(`Confirmed date: ${date}`);
        // Add additional logic here if needed
        // setIsModalOpen(false); // Close modal after confirmation
    
    
          setLoading(true);
          setMessage('');
    const token =  localStorage.getItem('token');
          try {
              const response = await createDate(date || '', token || '');
              setMessage('Request successful!');
              console.log(response);
              setTimeout(() => {
                onClose()
              }, 2000);
              
          } catch (error) {
              setMessage('Request failed. Please try again.');
              console.error('Request error:', error);
          } finally {
              setLoading(false);
          }
        }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Are you sure you want to mark the attendance as present.</h2>
        <h3>Selected date : {date}</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button className="btn-disabled" onClick={onClose}>Cancel</button>
        </div>
        {loading && <Loader />} {/* Display loader during login */}
    {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Modal;