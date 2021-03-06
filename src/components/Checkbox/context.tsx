import { createContext, useContext } from 'react';

import { Colors, Size } from 'types';

import { CheckboxOptionType, CheckboxValueType } from './CheckboxGroup';

export interface CheckboxGroupStateValue {
  /** Value cua Checkbox group */
  value?: CheckboxValueType[];
  /** disabled tat ca Checkbox */
  disabled?: boolean;
  /** Thuoc tinh name html cua Checkbox */
  name?: string;
  /** Kich thuoc Checkbox */
  size?: Size;
  /** Color khi Checkbox active */
  activeColor?: string;
  /** Màu border được lấy màu từ ThemeProvider */
  borderColor?: string;
  /** Color icon ben trong checkbox group */
  iconActiveColor?: string;
}

export type CheckboxGroupAction = (option: CheckboxOptionType) => void;

const CheckboxGroupContext = createContext<CheckboxGroupStateValue | null>(null);

const CheckboxGroupActionContext = createContext<CheckboxGroupAction | null>(null);

export const CheckboxGroupStateProvider = CheckboxGroupContext.Provider;

export const CheckboxGroupActionProvider = CheckboxGroupActionContext.Provider;

export const useCheckboxState = () => {
  const state = useContext(CheckboxGroupContext);
  return state;
};

export const useCheckboxAction = () => {
  const action = useContext(CheckboxGroupActionContext);
  return action;
};
