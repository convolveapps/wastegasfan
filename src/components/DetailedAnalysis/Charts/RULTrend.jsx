import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const renderLabel = ({ viewBox: { x, y } }) => {
  const d =10;
  const r = d / 2;

  const transform = `translate(${x} ${y+d*8})`;

  return (
      <g transform={transform}>
        {/* <rect x="0" y="0" width="30" height="20" fill="#40c234"></rect> */}
        <text x="1" y="15" fontSize="14" fill="#8884d8">days</text>
      </g>
  );
};

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
          <YAxis label={renderLabel} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="RUL" stroke="#8884d8" activeDot={{ r: 5 }} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default RULTrend