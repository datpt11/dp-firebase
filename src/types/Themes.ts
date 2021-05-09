import defaultColors from 'utils/defaultColors';

export type Colors = typeof defaultColors;

export type ColorNames = keyof Colors;

export type BorderStyle = 'solid' | 'dashed' | 'dotted';

export type Size = 'extra-small' | 'small' | 'medium' | 'large';

export type Radius = 'square' | 'pill' | 'rounded';
