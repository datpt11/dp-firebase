import React, { FC, memo } from 'react';

import { Radius } from 'types';

export interface CheckboxLoadingProps {
  radius?: Radius;
}

const CheckboxLoading: FC<CheckboxLoadingProps> = ({}) => {
  return (
    <div className="h-6 flex items-center">
      <div className="h-6 w-6 bg-gray-400 rounded-none"></div>
      <div className="w-20 h-[10px] ml-2 bg-gray-400 rounded-none"></div>
    </div>
  );
};

export default memo(CheckboxLoading);
