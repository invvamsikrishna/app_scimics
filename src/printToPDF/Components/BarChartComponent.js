import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';

const data = [
  { name: '1', value: 4 },
  { name: '2', value: 3 },
  { name: '3', value: 5 },
  { name: '4', value: 5 },
];

const BasicBars = () => {
  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 90, left: 60, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{ fontSize:"25px"}}/>
        <YAxis style={{ fontSize:"25px"}} />
        <Bar dataKey="value" fill="#ced765" barSize={40}>
          <LabelList dataKey="value" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BasicBars;
