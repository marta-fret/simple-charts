import { convertPropsToString } from '../utils/typeUtils';
import { ChartDataDTO, ChartParams } from './types';

export class ChartService {
  private static paths = {
    points: 'points',
  };

  private apiURL: string;

  constructor(apiURL: string) {
    this.apiURL = apiURL;
  }

  async getChartPoints(chartParams: ChartParams): Promise<ChartDataDTO[]> {
    const searchParams = new URLSearchParams(convertPropsToString(chartParams));
    try {
      const response = await fetch(`${this.apiURL}/${ChartService.paths.points}?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error(`Fetching failed: ${response.statusText}`);
      }

      return response.json() as Promise<ChartDataDTO[]>;
    } catch (e) {
      console.error(e);

      const mockData = JSON.parse(
        '[{"name": "linear", "x": [-2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0], "y": [-2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]}, {"name": "square", "x": [-2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0], "y": [4.0, 3.61, 3.24, 2.89, 2.56, 2.25, 1.96, 1.69, 1.44, 1.21, 1.0, 0.81, 0.64, 0.49, 0.36, 0.25, 0.16, 0.09, 0.04, 0.01, 0.0, 0.01, 0.04, 0.09, 0.16, 0.25, 0.36, 0.49, 0.64, 0.81, 1.0, 1.21, 1.44, 1.69, 1.96, 2.25, 2.56, 2.89, 3.24, 3.61, 4.0]}, {"name": "cube", "x": [-2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0], "y": [-8.0, -6.86, -5.83, -4.91, -4.1, -3.38, -2.74, -2.2, -1.73, -1.33, -1.0, -0.73, -0.51, -0.34, -0.22, -0.12, -0.06, -0.03, -0.01, -0.0, 0.0, 0.0, 0.01, 0.03, 0.06, 0.12, 0.22, 0.34, 0.51, 0.73, 1.0, 1.33, 1.73, 2.2, 2.74, 3.38, 4.1, 4.91, 5.83, 6.86, 8.0]}]',
      ) as ChartDataDTO[];

      return mockData;
    }
  }
}
