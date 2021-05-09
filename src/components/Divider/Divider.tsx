import React, { FC } from 'react';

import styles from './Divider.module.scss';

export interface DividerProps {}

const Divider: FC<DividerProps> = () => {
  return <hr className={styles.container} />;
};

export default Divider;
