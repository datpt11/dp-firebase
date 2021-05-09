import React, { memo, FC } from 'react';

export interface AvatarLoadingProps {
  size?: number;
  color?: string;
}

const AvatarLoading: FC<AvatarLoadingProps> = ({ size = 30, color }) => {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
};

export default memo(AvatarLoading);
