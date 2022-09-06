import EYE_ICON from 'assets/icons/eye.svg';
import LOCK_ICON from 'assets/icons/lock.svg';
import USER_ICON from 'assets/icons/user.svg';
import Avatar from 'assets/images/Avatar.png';
import DesktopBackground from 'components/DesktopBackground';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import TextInput from 'components/TextInput';
import React from 'react';

import styles from './Authentication.module.css';

function Authentication() {
  return (
    <DesktopBackground blurred>
      <FlexDiv className={styles.container}>
        <img src={Avatar} alt="Avatar" className={styles.avatarImage} />
        <TextInput
          leftIcon={<Icon size="small" src={USER_ICON} alt="User Icon" className={styles.leftIcon} />}
          placeholder="Email"
        />
        <TextInput
          leftIcon={<Icon size="small" src={LOCK_ICON} alt="Lock Icon" className={styles.leftIcon} />}
          rightIcon={<Icon size="small" src={EYE_ICON} alt="Eye Icon" className={styles.leftIcon} />}
          placeholder="Password"
          hideText
        />
      </FlexDiv>

      {/* <Avatar /> */}
      {/* <LoginForm /> */}
    </DesktopBackground>
  );
}

export default Authentication;
