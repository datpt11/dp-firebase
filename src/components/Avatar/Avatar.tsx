import React, { FC } from 'react';

import Image from 'components/Image/Image';
import LineAwesome from 'components/LineAwesome';
import { LineAwesomeName } from 'types/LineAwesomeName';

import AvatarLoading from './AvatarLoading';
import avatarColors from './colors';

export interface AvatarProps {
  /** Kích thước của avatar */
  size?: number;
  /** Tên user */
  name?: string;
  /** Avatar uri */
  uri?: string;
  /** Ten cua icon trong font awesome hoac line awesome*/
  iconName?: LineAwesomeName;
  /** Background icon */
  backgroundIcon?: string;
}

interface AvatarStatic {
  Loading: typeof AvatarLoading;
}

const Avatar: FC<AvatarProps> & AvatarStatic = ({ size = 30, name = '', uri, iconName, backgroundIcon }) => {
  const textSize = size / 2 < 30 ? size / 2 : 30;
  const nameMatch = name.match(/^[^0-9]|\d/g);
  const text = !!name ? (!!nameMatch ? nameMatch[0].toUpperCase() : '') : '';
  const backgroundIndex = Math.floor(text.charCodeAt(0) % avatarColors.length);
  const backgroundColor = !backgroundIcon ? avatarColors[backgroundIndex] : backgroundIcon;

  if (!!uri) {
    return <Image src={uri} previewSrc={uri} width={size} aspectRatioInPercent={100} radius="pill" />;
  }

  const icon = !!iconName ? <LineAwesome name={iconName} className="text-white" /> : null;

  return (
    <div className="flex items-center justify-center rounded-full" style={{ width: size, height: size, backgroundColor }}>
      {!!name && !iconName ? (
        <div style={{ fontSize: textSize, lineHeight: `${textSize * 2}px` }} className="text-white">
          {text}
        </div>
      ) : (
        icon
      )}
    </div>
  );
};

Avatar.Loading = AvatarLoading;

export default Avatar;
