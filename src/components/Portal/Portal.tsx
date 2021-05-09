import React, { CSSProperties, DOMAttributes, FC } from 'react';

import { createPortal } from 'react-dom';

export interface PortalProps {
  innerRef: any;
  style: CSSProperties;
  onClick?: DOMAttributes<HTMLElement>['onClick'];
}

const Portal: FC<PortalProps> = ({ innerRef, style, children, onClick, ...rest }) => {
  return createPortal(
    <div {...rest} onClick={onClick} ref={innerRef} style={style}>
      {children}
    </div>,
    document.body,
  );
};

export default Portal;
