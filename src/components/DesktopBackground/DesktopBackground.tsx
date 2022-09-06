import React from 'react';

import styles from './DesktopBackground.module.css';

interface DesktopBackgroundProps {
  children?: React.ReactNode;
}
function DesktopBackground({ children }: DesktopBackgroundProps) {
  return <div className={styles.background}>{children}</div>;
}

export default DesktopBackground;
