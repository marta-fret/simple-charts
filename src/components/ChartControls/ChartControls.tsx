import React, { useState, useCallback, useEffect } from 'react';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ChartParams } from '../../API/types';

const boxStyle = {
  display: 'grid',
  gridTemplateColumns: '200px 100px 100px 100px',
  gridGap: '10px',
  backgroundColor: '#fff',
  fontFamily: 'Arial',
};

interface ChartControlsProps {
  chartParams: ChartParams;
  onChange: (newParams: ChartParams) => void;
}

export const ChartControls: React.FC<ChartControlsProps> = ({ chartParams, onChange }) => {
  const [newFrom, setNewFrom] = useState(chartParams.from);
  const [newTo, setNewTo] = useState(chartParams.to);
  const [newStep, setNewStep] = useState(chartParams.step);

  const newFromHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewFrom(Number(e.target.value)),
    [],
  );

  const newToHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setNewTo(Number(e.target.value)), []);

  const newStepHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewStep(Number(e.target.value)),
    [],
  );

  const onApply = () => {
    onChange({ from: newFrom, to: newTo, step: newStep });
  };

  useEffect(() => {
    setNewFrom(chartParams.from);
    setNewTo(chartParams.to);
    setNewStep(chartParams.step);
  }, [chartParams]);

  return (
    <Box sx={boxStyle}>
      <span>CHART PARAMETERS</span>
      <span>From</span>
      <span>To</span>
      <span>Step</span>
      <span>CURRENT</span>
      <span>{chartParams.from}</span>
      <span>{chartParams.to}</span>
      <span>{chartParams.step}</span>
      <Box>
        {/* TODO Should be disabled when data same as in current settings */}
        <Button variant="outlined" onClick={onApply}>
          APPLY NEW
        </Button>
      </Box>
      {/* TODO Validation rules should be added, so that values makes sense together and density of resulted data is not to big */}
      <Input type="number" value={newFrom} onChange={newFromHandler} inputProps={{ min: -50, max: -1 }} />
      <Input type="number" value={newTo} onChange={newToHandler} inputProps={{ min: 1, max: 50 }} />
      <Input type="number" value={newStep} onChange={newStepHandler} inputProps={{ step: 0.1, min: 0.1, max: 1 }} />
    </Box>
  );
};
