import { ChartDataDTO, ChartParams } from './types';

export const calculateDataOnFrontend = ({ from, to, step }: ChartParams): ChartDataDTO[] => {
  if (step === 0) {
    throw new Error('"step" can not be 0');
  }

  if (Math.abs(from) > 20 || Math.abs(to) > 20) {
    throw new Error('invalid "from" or "to" parameter - the values must be in range -20 to 20');
  }

  if ((from < to && step < 0) || (from > to && step > 0)) {
    throw new Error('invalid "step" sign for the defined range');
  }

  const range = Math.max(from, to) - Math.min(from, to);
  if (range <= Math.abs(step)) {
    throw new Error('invalid "step" value for the defined range - no points to generate');
  }

  if (range / Math.abs(step) > 50) {
    throw new Error('too small "step" for this range - too many points to generate');
  }

  const xArray = [];
  let xCurrent = from;
  if (from < to) {
    while (xCurrent < to) {
      xArray.push(xCurrent);
      xCurrent += step;
    }
  } else {
    while (xCurrent > to) {
      xArray.push(xCurrent);
      xCurrent += step;
    }
  }
  xArray.push(to);

  return [
    {
      name: 'linear',
      x: [...xArray],
      y: xArray.map((x) => x),
    },
    {
      name: 'square',
      x: [...xArray],
      y: xArray.map((x) => x ** 2),
    },
    {
      name: 'cube',
      x: [...xArray],
      y: xArray.map((x) => x ** 3),
    },
  ];
};
