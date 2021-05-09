import React, { DOMAttributes, FC, ReactNode, useCallback } from 'react';

import Password from './Password';

export type TypeHTML = 'text' | 'password' | 'textarea' | 'number';
export interface InputProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  defaulValue?: string;
  type?: TypeHTML;
  idHTML?: string;
  value?: string;
  innerRef?: any;
  placeholder?: string;
  onChange?: DOMAttributes<HTMLInputElement>['onChange'];
  onChangeText?: (text: string) => void;
}

interface InputStatic {
  Password: typeof Password;
}

const Input: FC<InputProps> & InputStatic = ({
  prefix,
  suffix,
  defaulValue,
  placeholder,
  disabled = false,
  innerRef,
  type = 'text',
  value,
  idHTML,
  onChange,
  onChangeText,
  ...rest
}) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    onChange?.(event);
    onChangeText?.(event.target.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`w-full rounded-full bg-gray-100 focus-within:border-primary focus-within:bg-white focus-within:border focus-within:ring-4 focus-within:ring-primary focus-within:ring-opacity-20 flex items-center px-3 ${
        disabled && 'cursor-not-allowed opacity-30'
      }`}
    >
      {!!prefix && prefix}
      <input
        {...rest}
        id={idHTML}
        type={type}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        ref={innerRef}
        placeholder={placeholder}
        defaultValue={defaulValue}
        className={`border-none focus:outline-none bg-transparent border-0  focus:ring-0 focus:border-0 w-full text-sm text-gray-900 ${
          disabled && 'cursor-not-allowed'
        }`}
      />
      {/* <div onClick={handleClear} className="flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full flex-shrink-0 flex-grow-0">
        <LineAwesome name="close" size={10} className="text-white leading-none" />
      </div> */}
      {!!suffix && suffix}
    </div>
  );
};

Input.Password = Password;

export default Input;
