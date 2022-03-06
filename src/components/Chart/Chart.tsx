import React, { useMemo, useState, useEffect } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts';
import { ChartData } from '../types';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const legendStyle = {
  display: 'flex',
};

const colors = ['green', 'blue', 'orange', 'violet', 'brown'];

const getInitialDisplayedCharts = (chartNames: string[]) =>
  chartNames.reduce((charts, name) => {
    charts[name] = true;
    return charts;
  }, {} as { [key: string]: boolean });

interface ChartProps {
  chartData: ChartData;
}

export const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const chartNames = useMemo(() => Object.keys(chartData), [chartData]);

  const [displayedCharts, setDisplayedCharts] = useState(getInitialDisplayedCharts(chartNames));

  useEffect(() => {
    setDisplayedCharts(getInitialDisplayedCharts(chartNames));
  }, [chartNames]);

  return (
    <Box sx={wrapperStyle}>
      <LineChart width={600} height={300} margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
        {chartNames.map((chartName, index) => (
          <Line
            key={chartName}
            hide={!displayedCharts[chartName]}
            dot={false}
            data={chartData[chartName]}
            dataKey="y"
            stroke={colors[index % colors.length]}
          />
        ))}
        <ReferenceLine x={0} stroke="red" />
        <ReferenceLine y={0} stroke="red" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="x" type="number" />
        <YAxis type="number" />
      </LineChart>
      <Box sx={legendStyle}>
        {chartNames.map((chartName) => (
          <FormControlLabel
            key={chartName}
            label={chartName}
            control={
              <Checkbox
                key={chartName}
                checked={displayedCharts[chartName]}
                onChange={(e) => {
                  setDisplayedCharts((prev) => ({ ...prev, [chartName]: e.target.checked }));
                }}
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
};
