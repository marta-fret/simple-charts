import React, { useEffect, useState } from 'react';
import { useAPIContext } from './APIContext';
import { Chart } from './Chart/Chart';
import { ChartParams } from './ChartParams/ChartParams';
import { ChartData } from './types';

export const AppLayout: React.FC = () => {
  const { chartService } = useAPIContext();

  const [chartParams, setChartParams] = useState({ from: -2, to: 2, step: 0.1 });
  const [chartData, setChartData] = useState<ChartData | undefined>(undefined);

  useEffect(() => {
    const loadData = async () => {
      const chartDTO = await chartService.getChartPoints(chartParams);

      const data = chartDTO.reduce<ChartData>((chart, { name, x: xArray, y: yArray }) => {
        chart[name] = xArray.map((x, index) => ({ x, y: yArray[index] }));
        return chart;
      }, {} as ChartData);

      setChartData(data);
    };

    loadData();
  }, [chartParams]);

  return (
    <div>
      <ChartParams />
      {chartData && <Chart chartData={chartData} />}
    </div>
  );
};
