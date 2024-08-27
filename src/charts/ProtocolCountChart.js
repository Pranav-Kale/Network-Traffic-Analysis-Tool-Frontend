// src/components/ProtocolCountChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProtocolCountChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.protocol_count),
    datasets: [
      {
        label: 'Protocol Count',
        data: Object.values(data.protocol_count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Protocol Count</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ProtocolCountChart;
