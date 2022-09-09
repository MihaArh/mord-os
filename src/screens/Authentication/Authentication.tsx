import DesktopBackground from 'components/DesktopBackground';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import TextInput from 'components/TextInput';
import { EMAIL_REGEX, Icons, Images } from 'models/constants';
import React, { useState } from 'react';

import styles from './Authentication.module.css';

function Authentication() {
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  function validateEmail() {
    if (email.length === 0) {
      setEmailErrorMessage('Email is required');
      return;
    }
    if (!email.toLowerCase().match(EMAIL_REGEX)) {
      setEmailErrorMessage('Email is invalid');
      return;
    }
    setEmailErrorMessage('');
  }

  function validatePassword() {
    if (password.length === 0) {
      setPasswordErrorMessage('Password is required');
      return;
    }
    setPasswordErrorMessage('');
  }

  function onEmailChangeHandler(text: string) {
    setEmail(text);
  }

  function onPasswordChangeHandler(text: string) {
    setPassword(text);
  }

  function onPasswordVisibilityClick() {
    setHidePassword(prevPasswordVisibility => !prevPasswordVisibility);
  }
  return (
    <DesktopBackground blurred>
      <FlexDiv className={styles.container}>
        <FlexDiv className={styles.avatarContainer}>
          <img src={Images.AVATAR} alt="Avatar" className={styles.avatarImage} />
        </FlexDiv>
        <TextInput
          onValueChange={onEmailChangeHandler}
          onBlur={validateEmail}
          errorMessage={emailErrorMessage}
          required
          leftIcon={<Icon size="small" src={Icons.USER} alt="User Icon" className={styles.leftIcon} />}
          placeholder="Email"
        />
        <TextInput
          required
          onValueChange={onPasswordChangeHandler}
          onBlur={validatePassword}
          errorMessage={passwordErrorMessage}
          leftIcon={<Icon size="small" src={Icons.LOCK} alt="Lock Icon" className={styles.leftIcon} />}
          rightIcon={
            <Icon
              size="small"
              src={hidePassword ? Icons.EYE : Icons.EYE_DISABLE}
              onClick={onPasswordVisibilityClick}
              alt="Hide Password"
              className={styles.leftIcon}
            />
          }
          placeholder="Password"
          hideText={hidePassword}
        />
      </FlexDiv>
    </DesktopBackground>
  );
}

export default Authentication;
