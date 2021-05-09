import React, { FC } from 'react';

import { TabPane as RcTabPane, TabPaneProps as RcTabPaneProps } from 'rc-tabs';

// import styles from './TabPane.module.scss';

export interface TabPaneProps extends RcTabPaneProps {}

const TabPane: FC<TabPaneProps> = ({ children, ...rest }) => {
  return <RcTabPane {...rest}>{children}</RcTabPane>;
};

export default TabPane;
