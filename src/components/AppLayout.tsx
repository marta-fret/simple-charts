import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { ChartParams } from '../API/types';
import { useAPIContext } from './APIContext';
import { Chart } from './Chart/Chart';
import { ChartControls } from './ChartControls/ChartControls';
import { ChartData } from './types';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px',
};

export const AppLayout: React.FC = () => {
  const { chartService } = useAPIContext();

  const [chartParams, setChartParams] = useState({ from: -2, to: 2, step: 0.1 });
  const [chartData, setChartData] = useState<ChartData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const onParamsChange = async (newParams: ChartParams) => {
    await loadData(newParams);
  };

  const loadData = useCallback(
    async (newChartParams) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const chartDTO = await chartService.getChartPoints(newChartParams);

        const newData = chartDTO.reduce<ChartData>((chart, { name, x: xArray, y: yArray }) => {
          chart[name] = xArray.map((x, index) => ({ x, y: yArray[index] }));
          return chart;
        }, {} as ChartData);

        setChartData(newData);
        setChartParams(newChartParams);
      } catch (e) {
        setError(String(e));
      } finally {
        setIsLoading(false);
      }
    },
    [chartService.getChartPoints],
  );

  useEffect(() => {
    loadData(chartParams);
  }, []);

  return (
    <Box sx={rootStyle}>
      <Box>
        <ChartControls chartParams={chartParams} onChange={onParamsChange} />
        {error && (
          <Typography color="red" variant="caption" component="p" align="center">
            {error}
          </Typography>
        )}
      </Box>
      {!isLoading && chartData ? <Chart chartData={chartData} /> : <CircularProgress />}
    </Box>
  );
};
