import React, { cloneElement, FC, ReactElement, ReactNode, useState } from 'react';

import LineAwesome from 'components/LineAwesome';
import { omit } from 'lodash';

import Input, { InputProps } from './Input';

export interface PasswordProps extends Omit<InputProps, 'suffix'> {
  visibilityToggle?: boolean;
  afterVisible?: ReactNode;
  beforeVisible?: ReactNode;
}

const Password: FC<PasswordProps> = ({
  visibilityToggle = true,
  beforeVisible = <LineAwesome name="eye-slash" size={20} />,
  afterVisible = <LineAwesome name="eye" size={20} />,
  ...rest
}) => {
  const [visibleState, setVisibleState] = useState(false);

  const handleVisible = () => {
    setVisibleState(!visibleState);
  };

  const getIcon = () => {
    if (visibleState) {
      return cloneElement(afterVisible as ReactElement, { onClick: handleVisible });
    } else {
      return cloneElement(beforeVisible as ReactElement, { onClick: handleVisible });
    }
  };

  const suffixIcon = visibilityToggle && getIcon();

  return <Input {...omit(rest, 'suffix')} type={visibleState ? 'text' : 'password'} suffix={suffixIcon} />;
};

export default Password;
