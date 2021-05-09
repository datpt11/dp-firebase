import React, { FC } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store/configureStore';

export interface AppContentProps {}

const AppContent: FC<AppContentProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default AppContent;
