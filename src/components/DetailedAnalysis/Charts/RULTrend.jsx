import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const RULTrend = ({data}) => {

    const rulData = data.map(x => (
      {
        date: x.date,
        RUL: parseFloat(parseFloat(x.RUL).toFixed(2))
      }
    ))

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={rulData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="RUL" stroke="#8884d8" activeDot={{ r: 5 }} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default RULTrend