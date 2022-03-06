import React from 'react';
import { APIContextProvider } from './components/APIContext';
import { AppLayout } from './components/AppLayout';

export const App: React.FC = () => {
  return (
    <APIContextProvider apiURL="http://localhost:8080">
      <AppLayout />
    </APIContextProvider>
  );
};
