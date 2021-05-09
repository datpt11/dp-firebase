import React, { FC } from 'react';

import Image from 'components/Image/Image';
import LineAwesome from 'components/LineAwesome';
import { LineAwesomeName } from 'types/LineAwesomeName';
import { Radius, Size } from 'types/Themes';

type OmitSize = Exclude<Size, 'extra-small'>;

export interface IconBoxProps {
  /** Size cua icon box */
  size?: OmitSize;
  /** Icon name*/
  iconName?: LineAwesomeName;
  /** Duong dan anh */
  uri?: string;
  /** BackgroundColor box icon */
  color?: string;
  /** Overlay Enabled*/
  overlayEnabled?: boolean;
  /** radius */
  radius?: Radius;
}

const COTAINERSIZEMAPING: Record<OmitSize, string> = {
  small: `h-[24px] w-[24px]`,
  medium: `h-[32px] w-[32px]`,
  large: 'h-[40px] w-[40px]',
};

const RADIUSMAPPING: Record<Radius, string> = {
  pill: 'rounded-full',
  square: '',
  rounded: 'rounded-[5px]',
};

const IconBox: FC<IconBoxProps> = ({ color, iconName, radius = 'rounded', overlayEnabled = false, size = 'large', uri }) => {
  const iconSizeMaping: Record<OmitSize, number> = {
    small: 16,
    medium: 20,
    large: 22,
  };

  const imageSizeMapping: Record<OmitSize, number> = {
    small: 24,
    medium: 32,
    large: 40,
  };

  if (!!uri) {
    return (
      <div className={`${COTAINERSIZEMAPING[size]}`}>
        <Image src={uri} previewSrc={uri} width={imageSizeMapping[size]} aspectRatioInPercent={100} radius={radius} />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center relative overflow-hidden ${COTAINERSIZEMAPING[size]} ${RADIUSMAPPING[radius]}`}
      style={{ backgroundColor: color }}
    >
      {!!iconName && <LineAwesome name={iconName} className="text-white" size={iconSizeMaping[size]} />}
      {overlayEnabled && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(224.91deg, rgba(255, 255, 255, 0.454059) 1.84%, rgba(255, 255, 255, 0.146399) 52.09%, rgba(255, 255, 255, 0) 100%)',
          }}
        />
      )}
    </div>
  );
};

export default IconBox;
