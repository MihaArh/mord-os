import classNames from 'classnames';
import React from 'react';

import styles from './DesktopBackground.module.css';

interface DesktopBackgroundProps {
  children?: React.ReactNode;
  blurred?: boolean;
}
function DesktopBackground({ children, blurred = false }: DesktopBackgroundProps) {
  return (
    <div className={classNames(styles.background)}>
      {blurred && <div className={blurred ? styles.blurred : ''} />}
      {children}
    </div>
  );
}

export default DesktopBackground;
