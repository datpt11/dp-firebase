import React, { FC, memo, ReactNode, useCallback } from 'react';

import ActivityIndicator from 'components/ActivityIndicator';
import useMergedState from 'hooks/useMergedState';
import { Size } from 'types/Themes';

type OmitSize = Exclude<Size, 'extra-small'>;

export interface SwitchProps {
  /** status active của component */
  checked?: boolean;
  /** default status active cuả component */
  defaultChecked?: boolean;
  /** children của khi active */
  CheckedChildren?: ReactNode;
  /** children của khi unactive */
  UnCheckedChildren?: ReactNode;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** Khi bật loading thì nút sẽ ở trạng thái loading và không thể thực hiện event */
  loading?: boolean;
  /** Kích thước component */
  size?: OmitSize;
  /** children của handle khi active */
  CheckedHandleChildren?: ReactNode;
  /** children của handle khi unactive */
  UncheckedHandleChildren?: ReactNode;
  /** Background color khi active ( color HEX )*/
  activeColor?: string;
  /** Background color khi chưa active ( color HEX )*/
  deActiveColor?: string;
  /** sự kiện onChange click vào component và nhận được event */
  onChange?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** sự kiện onChange click vào component và nhận được value */
  onValueChange?: (value: boolean) => void;
}

const COTAINERSIZEMAPING: Record<OmitSize, string> = {
  small: `h-[24px] min-w-[48px]`,
  medium: `h-[32px] min-w-[64px]`,
  large: 'h-[40px] min-w-[80px]',
};

const HANDLESIZEMAPING: Record<OmitSize, string> = {
  small: `h-[20px] w-[20px] left-[2px]`,
  medium: 'h-[28px] w-[28px] left-[2px]',
  large: 'h-[36px] w-[36px] left-[2px]',
};

const Switch: FC<SwitchProps> = ({
  checked = false,
  defaultChecked = false,
  disabled = false,
  size = 'small',
  CheckedChildren,
  UnCheckedChildren,
  CheckedHandleChildren,
  UncheckedHandleChildren,
  activeColor = 'transparent',
  deActiveColor = '#fff',
  loading = false,
  onChange,
  onValueChange,
}) => {
  const [innerChecked, setInnerChecked] = useMergedState(false, {
    value: checked,
    defaultValue: defaultChecked,
  });

  const handleChange = useCallback((newChecked: boolean, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let mergedChecked = innerChecked;
    // truoc khi thay doi

    if (loading || disabled) {
      return;
    }
    mergedChecked = newChecked;
    // sau khi thay doi
    setInnerChecked(mergedChecked);
    onChange?.(event);
    onValueChange?.(mergedChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleChange(!innerChecked, event);
  };

  const innerContent = innerChecked ? CheckedChildren : UnCheckedChildren;

  const innerHandle = innerChecked ? CheckedHandleChildren : UncheckedHandleChildren;

  return (
    <button
      onClick={handleClick}
      className={`switch__container relative flex items-center rounded-full border border-gray-200 focus:outline-none ${COTAINERSIZEMAPING[size]} ${
        disabled && 'opacity-20'
      }`}
      style={innerChecked ? { backgroundColor: activeColor } : { backgroundColor: deActiveColor }}
    >
      <span
        className={`switch__handle absolute top-1/2 bg-primary rounded-full flex items-center justify-center text-xl shadow-md transform -translate-y-1/2 transition-transform duration-300 ease-in-out ${
          innerChecked && `translate-x-(switch-x)`
        } ${HANDLESIZEMAPING[size]}`}
      >
        {loading ? <ActivityIndicator size={size} /> : innerHandle}
      </span>
      <span
        className={`switch__inner  absolute top-1/2 transform -translate-y-1/2 ${innerChecked && ` -translate-x-(switch-x)`} ${
          !innerChecked ? 'right-[8px]' : 'left-[8px]'
        }`}
      >
        {innerContent}
      </span>
    </button>
  );
};

export default memo(Switch);
