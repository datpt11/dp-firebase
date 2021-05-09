import React, { Children, cloneElement, FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Modifier, OptionsGeneric } from '@popperjs/core';
import { Options } from '@popperjs/core/lib/modifiers/offset';
import Portal from 'components/Portal';
import { Manager, Popper, Reference as Target } from 'react-popper';

type Name = string;

export interface PopconfirmProps extends Partial<OptionsGeneric<Partial<Modifier<Name, Options>>>> {
  content: (onClose?: () => void) => ReactNode | ReactNode;
}

const Popconfirm: FC<PopconfirmProps> = ({ content, children, ...rest }) => {
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

  const handleClose = () => {
    setIsShow(false);
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
        <Popper {...rest}>
          {({ ref, style }) => {
            return (
              <Portal style={style} onClick={handleClickInner} innerRef={ref}>
                {content(handleClose)}
              </Portal>
            );
          }}
        </Popper>
      )}
    </Manager>
  );
};

export default Popconfirm;
