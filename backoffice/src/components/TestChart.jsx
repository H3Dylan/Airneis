// src/components/TestChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Day 1', sales: 4000 },
  { name: 'Day 2', sales: 3000 },
  { name: 'Day 3', sales: 2000 },
  { name: 'Day 4', sales: 2780 },
  { name: 'Day 5', sales: 1890 },
  { name: 'Day 6', sales: 2390 },
  { name: 'Day 7', sales: 3490 },
];

const TestChart = () => (
  <div>
    <h2>Sales Over the Last 7 Days</h2>
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </div>
);

export default TestChart;
