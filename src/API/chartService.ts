import { convertPropsToString } from '../utils/typeUtils';
import { ChartDataDTO, ChartParams } from './types';
import { calculateDataOnFrontend } from './utils';

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
      console.error('API call failed - data calculated on frontend will be shown');

      return calculateDataOnFrontend(chartParams);
    }
  }
}
