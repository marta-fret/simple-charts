import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ChartParams } from '../../API/types';
import { Typography } from '@mui/material';
import { CurrentParamValue } from './CurrentParamValue';

const rootStyle = {
  display: 'grid',
  gridTemplateColumns: '120px 100px 100px 100px',
  gridGap: '10px',
  backgroundColor: '#fff',
  fontFamily: 'Arial',
};

const inputStyle = {
  '& > input': {
    textAlign: 'center',
    paddingLeft: '10px',
  },
};

interface ChartControlsProps {
  chartParams: ChartParams;
  onChange: (newParams: ChartParams) => void;
}

export const ChartControls: React.FC<ChartControlsProps> = ({ chartParams, onChange }) => {
  const [newFrom, setNewFrom] = useState(chartParams.from);
  const [newTo, setNewTo] = useState(chartParams.to);
  const [newStep, setNewStep] = useState(chartParams.step);

  const applyDisabled = useMemo(() => {
    const { from, to, step } = chartParams;
    return !(newFrom !== from || newTo !== to || newStep !== step);
  }, [chartParams, newFrom, newTo, newStep]);

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
    <Box sx={rootStyle}>
      <span></span>
      <Typography align="center" variant="subtitle2">
        FROM
      </Typography>
      <Typography align="center" variant="subtitle2">
        TO
      </Typography>
      <Typography align="center" variant="subtitle2">
        STEP
      </Typography>

      <Typography variant="caption">CURRENT PARAMS</Typography>
      <CurrentParamValue value={chartParams.from} />
      <CurrentParamValue value={chartParams.to} />
      <CurrentParamValue value={chartParams.step} />

      <Box>
        <Button variant="outlined" onClick={onApply} disabled={applyDisabled}>
          APPLY NEW
        </Button>
      </Box>
      {/* TODO Validation warnings should be shown on frontend and button should be disabled when errors present*/}
      <Input
        type="number"
        value={newFrom}
        onChange={newFromHandler}
        inputProps={{ min: -20, max: 20 }}
        sx={inputStyle}
      />
      <Input type="number" value={newTo} onChange={newToHandler} inputProps={{ min: -20, max: 20 }} sx={inputStyle} />
      <Input type="number" value={newStep} onChange={newStepHandler} inputProps={{ step: 0.1 }} sx={inputStyle} />
    </Box>
  );
};
