// components/FinancialChart.js
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const FinancialChart = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="title" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default FinancialChart;