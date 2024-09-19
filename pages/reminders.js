// pages/reminders.js
import React, { useState } from 'react';
import axios from 'axios';

const Reminders = () => {
  const [reminderMessage, setReminderMessage] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleAddReminder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/notifications/reminders',
        { reminderMessage, dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Reminder set successfully!');
    } catch (error) {
      setMessage('Error setting reminder.');
      console.error('Error adding reminder:', error);
    }
  };

  return (
    <div>
      <h1>Set a Reminder</h1>
      <form onSubmit={handleAddReminder}>
        <input
          type="text"
          placeholder="Reminder Message"
          value={reminderMessage}
          onChange={(e) => setReminderMessage(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Set Reminder</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Reminders;