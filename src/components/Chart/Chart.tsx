import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, CartesianAxis, ReferenceLine } from 'recharts';
import { ChartData } from '../types';

interface ChartProps {
  chartData: ChartData;
}

export const Chart: React.FC<ChartProps> = ({ chartData }) => {
  return (
    <LineChart width={600} height={300}>
      <Line dot={false} data={chartData['linear']} dataKey="y" stroke="#0c0c0c" />
      <Line dot={false} data={chartData['square']} dataKey="y" stroke="green" />
      <Line dot={false} data={chartData['cube']} dataKey="y" stroke="blue" />
      <ReferenceLine x={0} stroke="red" />
      <ReferenceLine y={0} stroke="red" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="x" type="number" />
      <YAxis type="number" />
    </LineChart>
  );
};
