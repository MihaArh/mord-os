import classNames from 'classnames';
import React from 'react';

import styles from './Icon.module.css';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size: 'small' | 'large';
  alt: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
function Icon({ size: iconSize, alt, disabled = false, className, onClick, ...props }: IconProps) {
  return (
    <button onClick={onClick} type="button" className={styles.button} disabled={disabled}>
      <img
        className={classNames(
          iconSize === 'small' ? styles.smallIcon : styles.largeIcon,
          onClick ? styles.clickable : '',
          disabled ? styles.disabled : '',
          className,
        )}
        alt={alt}
        {...props}
      />
    </button>
  );
}

export default Icon;
