import React, { FC } from 'react';

import { Size } from 'types/Themes';

export interface ActivityIndicatorProps {
  size?: Size;
  color?: string;
}

const SIZEMAPPING: Record<Size, string> = {
  'extra-small': 'h-2 w-2',
  small: 'h-4 w-4',
  medium: 'h-6 w-6',
  large: 'h-8 w-8',
};

const ActivityIndicator: FC<ActivityIndicatorProps> = ({ color = 'white', size = 'medium' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={`animate-spin ${SIZEMAPPING[size]}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{
        display: 'block',
        backgroundRepeat: 'initial',
      }}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={color}
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="matrix(1,0,0,1,0,0)"
        style={{
          transform: 'matrix(1, 0, 0, 1, 0, 0)',
        }}
      ></circle>
    </svg>
  );
};

export default ActivityIndicator;
