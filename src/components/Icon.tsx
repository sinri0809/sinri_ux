import React from 'react';
import styles from '@styles/style.module.scss';
import ICON_DATA_MAP, { IconKeys } from './IconList';

type IconProps = {
  data: IconKeys;
  name: string;
  width?: number | string;
  color?: string;
};

const Icon = ({ data, name, width, color }: IconProps) => {
  const iconStyle = () => {
    const iconWidth = width ? { width } : {};
    const iconColor = color ? { fill: color } : {};

    return {
      ...iconWidth,
      ...iconColor
    };
  };

  return (
    <i
      style={iconStyle()}
      color={color}
      aria-label={name}
      className={`${styles.icon} ${styles.data}`}
    >
      {ICON_DATA_MAP[data]}
    </i>
  );
};

export type { IconProps };

export default Icon;

Icon.defaultProps = {
  width: null,
  color: 'origin'
};
