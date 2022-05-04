import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { scaleOrdinal } from 'd3-scale';
// import { schemeCategory10 } from 'd3-scale-chromatic';

// const colors = scaleOrdinal(schemeCategory10).range();

let data = [];

const getWeekDay = (day) =>{
    switch(day){
        case 0: return "Sun";
                break;
        case 1: return "Mon";
                break;
        case 2: return "Tue";
                break;
        case 3: return "Wed";
                break;
        case 4: return "Thu";
                break;
        case 5: return "Fri";
                break;
        case 6: return "Sat";
                break;
        default: return "Sun";
                break;
    }
}

const getScore = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Last7Days = () => {
    data = [];
    for (var i=1; i<=7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        data.push( { "date": getWeekDay(d.getDay()), "score": getScore(30, 100) } )
    }
}

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

const SystemEfficiency = () => {

    Last7Days();

    const getBarColor = (score) =>{
        if(score>70){
            return "#40c234";
        }
        else if(score>40){
            return "#ff7752";
        }
        else{
            return "#f53d3d";
        }
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Bar dataKey="score" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
}

export default SystemEfficiency