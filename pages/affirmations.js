// pages/affirmations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Affirmations = () => {
  const [affirmations, setAffirmations] = useState([]);
  const [newAffirmation, setNewAffirmation] = useState('');
  const [error, setError] = useState('');

  // Fetch affirmations when the component mounts
  useEffect(() => {
    const fetchAffirmations = async () => {
      try {
        const response = await axios.get('/api/affirmations');
        setAffirmations(response.data);
      } catch (err) {
        setError('Error fetching affirmations');
        console.error(err);
      }
    };
    fetchAffirmations();
  }, []);

  // Add a new affirmation
  const addAffirmation = async () => {
    if (!newAffirmation) return;
    try {
      const response = await axios.post('/api/affirmations', { content: newAffirmation });
      setAffirmations([...affirmations, response.data]);
      setNewAffirmation('');
    } catch (err) {
      setError('Error adding affirmation');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Affirmations</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {affirmations.map((affirmation) => (
          <li key={affirmation.id}>{affirmation.content}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newAffirmation}
          onChange={(e) => setNewAffirmation(e.target.value)}
          placeholder="Add a new affirmation"
        />
        <button onClick={addAffirmation}>Add Affirmation</button>
      </div>
    </div>
  );
};

export default Affirmations;