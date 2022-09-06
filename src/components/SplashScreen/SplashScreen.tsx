import Logo from 'assets/images/Logo.png';
import classNames from 'classnames';
import React from 'react';

import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  onComplete: () => void;
}

function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className={classNames(styles.container, styles.appear)} onAnimationEnd={onComplete}>
      <img src={Logo} alt="MordOS Logo" className={styles.img} />
    </div>
  );
}

export default SplashScreen;
