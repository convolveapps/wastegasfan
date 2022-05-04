import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export async function getPersistentAnomalyData(xlData){
    const anomalyMotors = xlData.filter(d => d["Anomaly Flag"] == 1 || d["Anomaly Flag"] == 2);

    const pAnomaly = [];

    for(let i=0; i<anomalyMotors.length; i++){
      const index = pAnomaly.findIndex(x => x["motorId"] == anomalyMotors[i]["Motor ID"]);

      

      if(index == -1){
        pAnomaly.push({
          "motorId": anomalyMotors[i]["Motor ID"],
          "motorName": anomalyMotors[i]["Motor Short Desc"],
          "timestamp": [anomalyMotors[i]["Timestamp"].split(" ")[0]],
          "count": 1
        });
      }
      else{
        if(pAnomaly[index].timestamp.indexOf(anomalyMotors[i]["Timestamp"].split(" ")[0]) == -1){
          pAnomaly[index]["count"] += 1;
          pAnomaly[index].timestamp.push(anomalyMotors[i]["Timestamp"].split(" ")[0]);
        }
      }
    }

    pAnomaly.sort((a,b) => b.count - a.count);

    return pAnomaly;
}

export default function PersistentAnomaly({persistentAnomaly}) {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
        //   width={500}
        //   height={300}
          data={persistentAnomaly}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="motorId" interval={0} angle={20} dx={20} dy={10} />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#f53d3d" />
        </BarChart>
      </ResponsiveContainer>
    );
}
