import classNames from 'classnames';
import React from 'react';

import styles from './Icon.module.css';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size: 'small' | 'large';
  alt: string;
  className?: string;
}
function Icon({ size, alt, className, onClick, ...props }: IconProps) {
  return (
    <img
      className={classNames(
        size === 'small' ? styles.smallIcon : styles.largeIcon,
        onClick ? styles.clickable : '',
        className,
      )}
      alt={alt}
      {...props}
    />
  );
}

export default Icon;
