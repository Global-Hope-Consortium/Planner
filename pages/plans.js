/* // pages/plans.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/plans', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(res.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/plans',
        { title, amount, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPlans();
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div>
      <h1>Your Plans</h1>
      <form onSubmit={handleAddPlan}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Plan</button>
      </form>

      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>{plan.title}: {plan.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Plans; */
// pages/plans.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  // Fetch plans
  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/plans', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(res.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      if (error.response?.status === 401) {
        router.push('/login'); // Redirect to login if unauthorized
      }
    }
  };

  // Add a new plan
  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/plans',
        { title, amount, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPlans();
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('rememberMeUsername'); // Optional: remove saved credentials
    localStorage.removeItem('rememberMePassword');
    router.push('/login'); // Redirect to login page
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      router.push('/login');
    } else {
      fetchPlans();
    }
  }, []);

  return (
    <div>
      <h1>Your Plans</h1>
      <button onClick={handleLogout}>Logout</button> {/* Logout Button */}

      <form onSubmit={handleAddPlan}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Plan</button>
      </form>

      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            {plan.title}: {plan.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plans;