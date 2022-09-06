import USER_ICON from 'assets/icons/user.svg';
import FlexDiv from 'components/FlexDiv';
import React from 'react';

import styles from './TextInput.module.css';

function TextInput() {
  return (
    <FlexDiv className={styles.container}>
      <img src={USER_ICON} alt="User icon" width={24} height={24} className={styles.leftIcon} />
      <div className={styles.divider} />
      <input type="text" className={styles.input} />
    </FlexDiv>
  );
}

export default TextInput;
