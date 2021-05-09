import React, { Children, cloneElement, FC, ReactNode, useEffect, useRef, useState } from 'react';

import Portal from 'components/Portal';
import { Manager, Popper, Reference as Target } from 'react-popper';

export interface PopoverProps {
  content: ReactNode;
}

const Popover: FC<PopoverProps> = ({ content, children }) => {
  const [isShow, setIsShow] = useState(false);
  const clickCaptured = useRef(false);

  const handleClickOutside = () => {
    if (!clickCaptured.current) {
      setIsShow(false);
    }
    clickCaptured.current = false;
  };

  const handleClickInner = () => {
    clickCaptured.current = true;
  };

  const handleToggle = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Manager>
      <Target>
        {({ ref }) => {
          return Children.map(children, child => {
            return cloneElement(child as React.ReactElement<any>, { ref, onClick: handleToggle, onMouseDown: handleClickInner });
          });
        }}
      </Target>
      {isShow && (
        <Popper>
          {({ ref, style }) => {
            return (
              <Portal style={style} onClick={handleClickInner} innerRef={ref}>
                {content}
              </Portal>
            );
          }}
        </Popper>
      )}
    </Manager>
  );
};

export default Popover;
