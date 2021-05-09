import React, { FC, memo, ReactNode } from 'react';

import { useSelector } from 'react-redux';

export interface PrivateComponentProps {
  children: ReactNode;
  loggedInComponent?: ReactNode;
}

// Lấy từ redux
const authSelector = () => ({
  isLoggedIn: true,
});

const PrivateComponent: FC<PrivateComponentProps> = ({ children, loggedInComponent = null }) => {
  const { isLoggedIn } = useSelector(authSelector);
  if (isLoggedIn) {
    return <>{loggedInComponent}</>;
  }
  return <>{children}</>;
};

export default memo(PrivateComponent);
