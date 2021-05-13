import React, { DOMAttributes, FC, ReactNode } from 'react';

import ActivityIndicator from 'components/ActivityIndicator';
import { Size } from 'types';

import styles from './Button.module.scss';

type Shape = 'circle' | 'round';

type HtmlType = 'submit' | 'reset' | 'button';

type OmitSize = Exclude<Size, 'extra-small'>;

export interface ButtonProps {
  size?: OmitSize;
  block?: boolean;
  disabled?: boolean;
  href?: string;
  htmlType?: HtmlType;
  target?: string;
  loading?: boolean;
  icon?: ReactNode;
  shape?: Shape;
  border?: boolean;
  backgroundColor?: string;
  color?: string;
  loadingColor?: string;
  containerClassName?: string;
  onClick?: DOMAttributes<HTMLButtonElement | HTMLAnchorElement>['onClick'];
}

const SIZECONTAINERMAPPING: Record<OmitSize, string> = {
  small: 'h-[24px] px-[7px] text-xs',
  medium: 'h-[32px] px-[15px] text-xs',
  large: 'h-[40px] px-[15px] text-xs',
};

const SIZECIRCLECONTAINERMAPPING: Record<OmitSize, string> = {
  small: 'h-[24px] w-[24px] text-xs',
  medium: 'h-[32px] w-[32px] text-sm',
  large: 'h-[40px] w-[40px] text-lg',
};

const Button: FC<ButtonProps> = ({
  size = 'medium',
  href,
  icon,
  target,
  border = true,
  shape,
  backgroundColor,
  color,
  loading = false,
  block = false,
  disabled = false,
  containerClassName,
  htmlType = 'button',
  loadingColor = '#18181b',
  children,
  onClick,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    onClick?.(event);
  };

  const _icon = !!icon && icon;

  if (!!href || !!target) {
    return (
      <a className={`${!!containerClassName && containerClassName}`} href={href} style={{ color }} target={target} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      type={htmlType}
      className={`${styles.container} ${shape === 'circle' ? `rounded-full ${SIZECIRCLECONTAINERMAPPING[size]}` : `${SIZECONTAINERMAPPING[size]}`} ${
        shape === 'round' ? 'rounded-[5px]' : ''
      }  ${disabled ? 'cursor-not-allowed bg-gray-200 opacity-40' : 'cursor-pointer'} ${block && 'w-full'} ${
        border ? 'border border-gray-200' : ''
      } focus:outline-none ${!!containerClassName && containerClassName}`}
      style={{ backgroundColor, color }}
      onClick={handleClick}
    >
      {(icon || loading) && (
        <span className={`${styles.icon} ${shape === 'circle' ? 'mr-0' : ' mr-2'}`}>
          {loading ? <ActivityIndicator color={loadingColor} size={size} /> : _icon}
        </span>
      )}
      {!!children && <span className="flex-shrink-0 flex-grow-0 ">{children}</span>}
    </button>
  );
};

export default Button;
