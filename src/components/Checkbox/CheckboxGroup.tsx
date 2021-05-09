import React, { FC, ReactNode, useEffect, useState } from 'react';

import { Size } from 'types';

import Checkbox from './Checkbox';
import { CheckboxGroupActionProvider, CheckboxGroupStateProvider } from './context';

export type CheckboxValueType = string;

export interface CheckboxOptionType {
  label?: ReactNode;
  value?: CheckboxValueType;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** name Checkbox */
  name?: string;
  /** Default values Checkbox */
  defaultValue?: CheckboxValueType[];
  /** options của Checkbox */
  options?: Array<CheckboxOptionType | string>;
  /** values của Checkbox */
  value?: CheckboxValueType[];
  /** children */
  children?: ReactNode;
  /** Kich thuoc Checkbox */
  size?: Size;
  /** disabled tat ca Checkbox */
  disabled?: boolean;
  /** Color khi Checkbox active */
  activeColor?: string;
  /** Màu border được lấy màu từ ThemeProvider */
  borderColor?: string;
  /** ref Checkbox */
  innerRef?: any;
  /** Color icon ben trong checkbox */
  iconActiveColor?: string;
  /** Sự kiện onChange Checkbox */
  onChange?: (checkedValue: CheckboxValueType[]) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  defaultValue,
  name,
  value,
  size = 'small',
  disabled = false,
  children,
  borderColor = '#e4e4e7',
  options = [],
  activeColor = '#4f3cc9',
  iconActiveColor = 'white',
  innerRef,
  onChange,
}) => {
  const [valueState, setValueState] = useState<CheckboxValueType[]>(value || defaultValue || []);

  useEffect(() => {
    if (!!value) {
      setValueState(value || []);
    }
  }, [value]);

  const getOptions = () => {
    return options.map(option => {
      if (typeof option === 'string') {
        // Nếu option là string thì tạo ra option có label là option và value là option
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  };

  const handleChange = (option: CheckboxOptionType) => {
    console.log(option);
    // option là checkbox vừa bấm
    // Kiểm tra xem value có tồn tại trong mảng valueState hay không
    const optionIndex = valueState.indexOf(String(option.value));
    // clone ra mảng khác
    const newValue = [...valueState];

    if (optionIndex === -1) {
      // nếu optionIndex = -1 có nghĩa là không tồn tại trong mảng valueState (chưa được check) thì thêm vào mảng newValue
      newValue.push(String(option.value));
    } else {
      // nếu optionIndex != -1 có nghĩa là đã tồn tại trong mảng valueState (đã được check) thì remove option đi
      newValue.splice(optionIndex, 1);
    }
    if (!value) {
      // nếu không có value thì Khi onChange sẽ set mảng newValue
      setValueState(newValue);
    }
    onChange?.(newValue);
  };
  console.log(valueState);
  const renderGroup = () => {
    let childrenToRender = children;
    if (options && options.length > 0) {
      childrenToRender = getOptions().map(option => {
        return (
          <Checkbox
            disabled={option.disabled ? option.disabled : disabled}
            checked={value?.indexOf(String(option.value)) !== -1}
            value={option.value}
            key={option.value?.toString()}
            innerRef={innerRef}
          >
            {option.label}
          </Checkbox>
        );
      });
    }
    return childrenToRender;
  };
  return (
    <CheckboxGroupStateProvider value={{ size, activeColor, borderColor, iconActiveColor, disabled, name, value: valueState }}>
      <CheckboxGroupActionProvider value={handleChange}>{renderGroup()}</CheckboxGroupActionProvider>
    </CheckboxGroupStateProvider>
  );
};

export default CheckboxGroup;
