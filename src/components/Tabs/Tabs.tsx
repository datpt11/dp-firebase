import React, { FC } from 'react';

import LineAwesome from 'components/LineAwesome';
import RcTabs, { TabsProps as RcTabsProps } from 'rc-tabs';

import TabPane from './TabPane';
import 'rc-tabs/assets/index.css';
import styles from './Tabs.module.scss';

export interface TabsProps
  extends Pick<
    RcTabsProps,
    | 'activeKey'
    | 'animated'
    | 'defaultActiveKey'
    | 'destroyInactiveTabPane'
    | 'direction'
    | 'editable'
    | 'locale'
    | 'moreIcon'
    | 'tabBarGutter'
    | 'tabPosition'
    | 'renderTabBar'
    | 'onChange'
    | 'onTabClick'
    | 'onTabScroll'
  > {}

interface TabsStatic {
  Pane: typeof TabPane;
}

const Tabs: FC<TabsProps> & TabsStatic = ({ moreIcon = <LineAwesome name="ellipsis-h" />, children, ...rest }) => {
  return (
    <div className={styles.container}>
      <RcTabs {...rest} moreIcon={moreIcon}>
        {children}
      </RcTabs>
    </div>
  );
};

Tabs.Pane = TabPane;

export default Tabs;
