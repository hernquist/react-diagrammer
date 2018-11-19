import React from 'react';

const LinesMaker = ({ lines, width, height }) => (
  <svg height={height} width={width}>
    {lines.map((row, i) => (
      row.map(card => (
        <line
          key={`${card.x2}+${card.y2}+${i}`} 
          x1={card.x1 + 60} 
          y1={card.y1 + 25} 
          x2={card.x2 + 60} 
          y2={card.y2 - 75} 
          style={{ stroke: "#2c3e50", strokeWidth: "2" }}
        />
      ))
    ))}
  </svg>
)

export default LinesMaker;
