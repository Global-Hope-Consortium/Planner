// pages/unified-view.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnifiedView = () => {
  const [plans, setPlans] = useState([]);
  const [affirmations, setAffirmations] = useState([]);
  const [error, setError] = useState('');

  // Fetch plans and affirmations when the component mounts
  useEffect(() => {
    const fetchUnifiedData = async () => {
      try {
        const plansResponse = await axios.get('/api/plans');
        const affirmationsResponse = await axios.get('/api/affirmations');
        setPlans(plansResponse.data);
        setAffirmations(affirmationsResponse.data);
      } catch (err) {
        setError('Error fetching unified view data');
        console.error(err);
      }
    };
    fetchUnifiedData();
  }, []);

  return (
    <div>
      <h1>Unified View</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <section>
        <h2>Your Financial Plans</h2>
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>
              <strong>{plan.title}</strong>: {plan.description} - ${plan.amount}
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>Your Affirmations</h2>
        <ul>
          {affirmations.map((affirmation) => (
            <li key={affirmation.id}>{affirmation.content}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default UnifiedView;