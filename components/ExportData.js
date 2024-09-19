// components/ExportData.js
import React from 'react';
import { exportToCSV } from '../utils/helpers/dataExport';

const ExportData = ({ data }) => {
  const handleExport = () => {
    exportToCSV(data, 'financial_plans');
  };

  return (
    <button onClick={handleExport}>Export to CSV</button>
  );
};

export default ExportData;