import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export async function getHealtSummaryData(todaysData){
  let summary = [];
  let uniqueTime = [];

  for(let i = 0; i<todaysData.length; i++){
    const time = todaysData[i]["Timestamp"];

    
    if(uniqueTime.indexOf(time) == -1){
      const critical_warning = todaysData.filter(x => x["Timestamp"] == time && (x["Anomaly Flag"] == 1 || x["Anomaly Flag"] == 2)).length;

      summary.push({"time":time.split(" ")[1], "score":critical_warning});

      uniqueTime.push(time);
    }
  }

  return summary;
}

const HealthSummary = ({healthSummary}) =>  {
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
        //   width={500}
        //   height={300}
          data={healthSummary}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#ff7752" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
     </ResponsiveContainer>
    );
}

export default HealthSummary