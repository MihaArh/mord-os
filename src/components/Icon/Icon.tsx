import classNames from 'classnames';
import React from 'react';

import styles from './Icon.module.css';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size: 'small' | 'large';
  alt: string;
  onClick?: () => void;
  className?: string;
}
function Icon({ size: iconSize, alt, className, onClick, ...props }: IconProps) {
  return (
    <button onClick={onClick} type="button" className={styles.button}>
      <img
        className={classNames(
          iconSize === 'small' ? styles.smallIcon : styles.largeIcon,
          onClick ? styles.clickable : '',
          className,
        )}
        alt={alt}
        {...props}
      />
    </button>
  );
}

export default Icon;
