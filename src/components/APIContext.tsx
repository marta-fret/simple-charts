import React, { useContext, useMemo } from 'react';
import { ChartService } from '../API/chartService';

const APIContext = React.createContext<APIContextValue | undefined>(undefined);

interface APIContextProviderProps {
  apiURL: string;
}

interface APIContextValue {
  chartService: ChartService;
}

export const APIContextProvider: React.FC<APIContextProviderProps> = ({ apiURL, children }) => {
  const chartService = useMemo(() => new ChartService(apiURL), [apiURL]);

  return <APIContext.Provider value={{ chartService }}> {children} </APIContext.Provider>;
};

export const useAPIContext = (): APIContextValue | never => {
  const value = useContext(APIContext);

  if (value === undefined) {
    throw new Error('useAPIContext must be used within APIContextProvider');
  }

  return value;
};
