import React from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ErrorBoundary from "./ErrorBoundary";
import AppRoutes from "./AppRoutes";
import { store, persistor } from './redux/store';
import useLazy from "./hooks/common/useLazy";

import "./assets/styles/scss/index.scss";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const LoadingLazy = useLazy(() => import("./components/UI/Loading/Loading"));

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}> {/* wrapper for react-query */}
        <Provider store={store}> {/* wrapper for redux-toolkit */}
          <PersistGate loading={<LoadingLazy />} persistor={persistor}> {/* wrapper for persistor */}
            <AppRoutes/>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
