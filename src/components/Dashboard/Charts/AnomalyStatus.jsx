import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export async function getAnomaliStatusData(todaysData,warningMotors,criticalMotors){
    return [
    { name: 'Normal', value: todaysData.length - (warningMotors.length+criticalMotors.length), color: "#40c234" },
    { name: 'Warning', value: warningMotors.length, color: "#e2b512" },
    { name: 'Critical', value: criticalMotors.length, color: "#f53d3d" }
    ];
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius,startAngle, endAngle, fill,payload, percent, value, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 2) * cos;
    const sy = cy + (outerRadius + 2) * sin;
    const mx = cx + (outerRadius + 5) * cos;
    const my = cy + (outerRadius + 5) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my+5;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    const label = `${parseFloat(percent*100).toFixed(2)}%`
  
    return (
        <g>
            <text x={ex + (cos >= 0 ? 1 : -1) * 2} y={ey} textAnchor={textAnchor} fill="#333">{label}</text>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey-5}`} stroke={fill} fill="none" />
        </g>
    );
};

const AnomalyStatus = ({anomalyStatus}) => {

    return (
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
            dataKey="value"
            isAnimationActive={true}
            data={anomalyStatus}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            >
                {anomalyStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
            <Legend />
            <Tooltip />
        </PieChart>
        </ResponsiveContainer>
    );
}

export default AnomalyStatus
