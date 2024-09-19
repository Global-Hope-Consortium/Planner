// pages/budget-analysis.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/analysis/budget', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnalysis(res.data);
      } catch (error) {
        console.error('Error fetching budget analysis:', error);
      }
    };

    fetchAnalysis();
  }, []);

  if (!analysis) return <p>Loading...</p>;

  return (
    <div>
      <h1>Budget Analysis</h1>
      <p>Total Amount: {analysis.totalAmount}</p>
      <p>Number of Plans: {analysis.numberOfPlans}</p>
      <p>Average Amount per Plan: {analysis.averageAmount}</p>
    </div>
  );
};

export default BudgetAnalysis;