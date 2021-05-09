import React, { FC, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';

import LineAwesome from 'components/LineAwesome';
import { Radius, Size } from 'types';

import styles from './Checkbox.module.scss';
import CheckboxGroup, { CheckboxValueType } from './CheckboxGroup';
import CheckboxLoading from './CheckboxLoading';
import { useCheckboxAction, useCheckboxState } from './context';

export interface CheckboxProps {
  /** Kích thước của checkbox */
  size?: Size;
  /** Trạng thái của checkbox */
  checked?: boolean;
  /** Trạng thái default của checkbox */
  defaultChecked?: boolean;
  /** Disabled Checkbox */
  disabled?: boolean;
  /** Backgroundcolor checkbox*/
  activeColor?: string;
  /** Color icon ben trong checkbox */
  iconActiveColor?: string;
  /** Icon ben trong checkbox */
  Icon?: ReactNode;
  /** value*/
  value?: CheckboxValueType;
  /** name */
  name?: string;
  /** InnerRef */
  innerRef?: any;
  /** Container ClassName */
  containerClassName?: string;
  /** borderWidth */
  borderWidth?: string;
  /** borderStyle */
  borderStyle?: string;
  /** borderColor */
  borderColor?: string;
  /** Default value của CheckBox */
  defaultValue?: string | number | string[];
  /** radius */
  radius?: Radius | number;
  /** inner classname */
  innerClassName?: string;
  /** Sự kiện khi bấm vào checkbox và nhận được event */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  /** Sự kiện khi bấm vào checkbox và nhận được value */
  onValueChange?: (value: boolean) => void;
}

const CONTROLSIZEMAPPING: Record<Size, number> = {
  large: 36,
  medium: 30,
  small: 24,
  'extra-small': 18,
};

const RADIUSMAPPING: Record<Radius, string> = {
  pill: '9999',
  square: '',
  rounded: '5',
};

interface CheckboxStatic {
  Loading: typeof CheckboxLoading;
  Group: typeof CheckboxGroup;
}

const Checkbox: FC<CheckboxProps> & CheckboxStatic = ({
  size = 'small',
  checked,
  defaultChecked = false,
  disabled = false,
  Icon,
  containerClassName,
  borderColor = '#e4e4e7',
  innerRef,
  radius = 5,
  borderWidth = 2,
  value,
  name,
  borderStyle = 'solid',
  innerClassName,
  activeColor = '#4f3cc9',
  iconActiveColor = 'white',
  children,
  onChange,
  onValueChange,
}) => {
  const [checkedState, setCheckedState] = useState(defaultChecked);
  const stateContext = useCheckboxState();
  const actionContext = useCheckboxAction();

  if (stateContext) {
    name = stateContext.name || name;
    checked = stateContext.value?.indexOf(String(value)) !== -1; // checked = true nếu value của checkbox tồn tại trong mảng stateContext.value
    disabled = disabled || (stateContext.disabled as boolean);
    size = stateContext.size as Size;
    activeColor = stateContext.activeColor as string;
    borderColor = stateContext.borderColor as string;
    iconActiveColor = stateContext.iconActiveColor as string;
  }

  const defaultIconMapping: Record<Size, ReactNode> = {
    'extra-small': <LineAwesome name="check" size={12} />,
    small: <LineAwesome name="check" size={16} />,
    medium: <LineAwesome name="check" size={20} />,
    large: <LineAwesome name="check" size={24} />,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    setCheckedState(!checkedState);
    onChange?.(event);
    onValueChange?.(!checkedState);
    actionContext?.({ label: children, value });
  };

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      setCheckedState(checked);
    }
  }, [checked]);

  const renderCheckboxNative = () => {
    return (
      <input
        name={name}
        value={value}
        disabled={disabled}
        className={styles.input}
        checked={checkedState}
        type="checkbox"
        ref={innerRef}
        onChange={handleChange}
      />
    );
  };

  const renderCheckboxIcon = () => {
    return (
      <span
        className={styles.control}
        style={{
          borderColor: borderColor,
          borderStyle: borderStyle,
          borderWidth: `${checkedState ? 0 : borderWidth}px`,
          width: CONTROLSIZEMAPPING[size],
          height: CONTROLSIZEMAPPING[size],
          borderRadius: `${typeof radius === 'number' ? radius : RADIUSMAPPING[radius]}px`,
        }}
      >
        {checkedState && (
          <>
            <span className={styles.icon} style={{ color: iconActiveColor }}>
              {Icon || defaultIconMapping[size]}
            </span>
            <div className={styles.bgIcon} style={{ backgroundColor: activeColor }} />
          </>
        )}
      </span>
    );
  };

  return (
    <label
      className={`${!!containerClassName && containerClassName}, ${styles.container} ${size === 'extra-small' ? 'text-xs' : 'text-sm'} ${
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100'
      }`}
    >
      <span className={`${innerClassName && innerClassName} ${styles.innerWrap} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        {renderCheckboxNative()}
        {renderCheckboxIcon()}
      </span>
      {!!children && <span className={`line-clamp-1 ${styles.children}`}>{children}</span>}
    </label>
  );
};

Checkbox.Loading = CheckboxLoading;
Checkbox.Group = CheckboxGroup;

export default Checkbox;
