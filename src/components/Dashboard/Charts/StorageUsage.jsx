import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'usage',
        usage: 75,
        fill: "#ffffff",
    }
];

// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };

const StorageUsage = () => {

    return (
      <ResponsiveContainer background width="100%" height="100%">
        <RadialBarChart background cx="50%" cy="50%"
            startAngle={0}
            endAngle={(data[0].usage/100)*360} 
            innerRadius="50%" 
            outerRadius="90%" barSize={10} data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'center', fill: '#ffffff' }}
            background
            clockWise
            dataKey="usage"
          />
          {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
        </RadialBarChart>
      </ResponsiveContainer>
    );
}

export default StorageUsage