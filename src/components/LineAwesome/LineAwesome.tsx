import React, { CSSProperties, FC, forwardRef } from 'react';

import { LineAwesomeName } from 'types/LineAwesomeName';
import classNames from 'utils/functions/classNames';

export interface IconProps {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface LineAwesomeProps extends IconProps {
  /** Icon name */
  name: LineAwesomeName;
  /** Icon size */
  size?: number;
  /** ClassName */
  className?: string;
}

const LineAwesome: FC<LineAwesomeProps> = forwardRef<HTMLElement, LineAwesomeProps>(({ name, className = '', size, ...rest }, ref) => {
  const _style: CSSProperties = size !== undefined ? { fontSize: `${size}px` } : {};
  return <i ref={ref} {...rest} style={_style} className={classNames(`la la-${name}`, className)} />;
});

export default LineAwesome;
