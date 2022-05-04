import React, {useState, useEffect} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ImpactingParameters({data,setAnomalyTrendParameter}) {

  const handleClick = (e) =>{
    setAnomalyTrendParameter(e.activeLabel.toLowerCase());
  }
 
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
        //   width={500}
        //   height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={handleClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="parameter" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Bar dataKey="normal" stackId="a" fill="#40c234" />
          <Bar dataKey="warning" stackId="a" fill="#e2b512" />
          <Bar dataKey="critical" stackId="a" fill="#f53d3d" />
        </BarChart>
      </ResponsiveContainer>
    );
}
