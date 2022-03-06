export interface ChartDataDTO {
  name: string;
  x: number[];
  y: number[];
}

export type ChartParams = {
  from: number;
  to: number;
  step: number;
};
