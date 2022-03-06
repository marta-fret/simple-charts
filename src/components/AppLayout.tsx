import { Box } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { ChartParams } from '../API/types';
import { useAPIContext } from './APIContext';
import { Chart } from './Chart/Chart';
import { ChartControls } from './ChartControls/ChartControls';
import { ChartData } from './types';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px',
};

export const AppLayout: React.FC = () => {
  const { chartService } = useAPIContext();

  const [chartParams, setChartParams] = useState({ from: -2, to: 2, step: 0.1 });
  const [chartData, setChartData] = useState<ChartData | undefined>(undefined);

  const onParamsChange = async (newParams: ChartParams) => {
    await loadData(newParams);
  };

  const loadData = useCallback(
    async (newChartParams) => {
      const chartDTO = await chartService.getChartPoints(newChartParams);

      const newData = chartDTO.reduce<ChartData>((chart, { name, x: xArray, y: yArray }) => {
        chart[name] = xArray.map((x, index) => ({ x, y: yArray[index] }));
        return chart;
      }, {} as ChartData);

      setChartData(newData);
      setChartParams(newChartParams);
    },
    [chartService.getChartPoints],
  );

  useEffect(() => {
    loadData(chartParams);
  }, []);

  return (
    <Box sx={boxStyle}>
      <ChartControls chartParams={chartParams} onChange={onParamsChange} />
      {/* TODO handle states: loading and error */}
      {chartData && <Chart chartData={chartData} />}
    </Box>
  );
};
