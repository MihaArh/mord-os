import Logo from 'assets/images/Logo.png';
import classNames from 'classnames';
import { Routes } from 'models/enums';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SplashScreen.module.css';

function SplashScreen() {
  const navigate = useNavigate();
  function onAnimationEnd() {
    navigate(Routes.LOGIN);
  }
  return (
    <div className={classNames(styles.container, styles.appear)} onAnimationEnd={onAnimationEnd}>
      <img src={Logo} alt="MordOS Logo" className={styles.img} />
    </div>
  );
}

export default SplashScreen;
