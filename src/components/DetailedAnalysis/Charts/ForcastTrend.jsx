import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ForcastTrend = ({data}) => {

    const forcastData = data.map(x => ({
      actualValue: parseFloat(x.actualValue).toFixed(2),
      forcastedValue: parseFloat(x.forcastedValue).toFixed(2),
      parameter: x.parameter,
      timestamp: x.timestamp
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={forcastData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="category" dataKey="actualValue" stroke="#8884d8" fill="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="category" dataKey="forcastedValue" stroke="#ff7752" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default ForcastTrend