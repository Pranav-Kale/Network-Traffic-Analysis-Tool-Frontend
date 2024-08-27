// src/components/TCPFlagsChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TCPFlagsChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.tcp_flags),
    datasets: [
      {
        label: 'TCP Flags',
        data: Object.values(data.tcp_flags),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>TCP Flags</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TCPFlagsChart;
