import React, { FC } from 'react';

import Header from 'containers/Header';

export interface LayoutAuthenticatedProps {}

const LayoutAuthenticated: FC<LayoutAuthenticatedProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LayoutAuthenticated;
