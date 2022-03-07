import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const currentValueStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: '#eeeeee',
  borderRadius: '5px',
};

interface CurrentParamValueProps {
  value: number;
}

export const CurrentParamValue: React.FC<CurrentParamValueProps> = ({ value }) => (
  <Box sx={currentValueStyle}>
    <Typography align="center">{value.toLocaleString()}</Typography>
  </Box>
);
