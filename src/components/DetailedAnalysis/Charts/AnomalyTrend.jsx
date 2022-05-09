import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
    return (
      <svg x={cx-8} y={cy-8} width={150} height={150} viewBox="0 0 1024 1024">
        <circle cx="50" cy="50" r="40" strokeWidth="20" fill={payload.type} />
      </svg>
    );
};

const CustomizedActiveDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
    return (
      <svg x={cx-10} y={cy-10} width={200} height={200} viewBox="0 0 1024 1024">
        <circle cx="50" cy="50" r="40" strokeWidth="20" fill={payload.type} />
      </svg>
    );
};

const AnomalyTrend = ({data}) => {

    const anomalyData = data.map(x => ({
      anomalies: parseFloat(x.anomalies).toFixed(2),
      parameter: x.parameter,
      timestamp: x.timestamp,
      type: x.type
    }));

    const fillColor = (type) =>{
      if(type == 0){
        return "#8884d8"; 
      }
      else if (type == 1){
        return "#e2b512";
      }
      else{
        return "#f53d3d"
      }
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={anomalyData}
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
            <Line type="category" dataKey="anomalies" stroke="#8884d8" dot={<CustomizedDot/>} strokeWidth={2} activeDot={<CustomizedActiveDot/>} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default AnomalyTrend

// dot={{className: fillColor(data.type)}}