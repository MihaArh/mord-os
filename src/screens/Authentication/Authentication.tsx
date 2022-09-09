import DesktopBackground from 'components/DesktopBackground';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import TextInput from 'components/TextInput';
import { EMAIL_REGEX, Icons, Images, USER } from 'models/constants';
import React, { useState } from 'react';

import styles from './Authentication.module.css';

function Authentication() {
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState('');

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

  function onLoginIconClick() {
    validateEmail();
    validatePassword();
    if (emailErrorMessage || passwordErrorMessage) {
      return;
    }
    if (email !== USER.EMAIL && password !== USER.PASSWORD) {
      setCredentialsErrorMessage('Invalid email or password');
      return;
    }
    setCredentialsErrorMessage('');
  }
  return (
    <DesktopBackground blurred>
      <FlexDiv className={styles.container}>
        <FlexDiv className={styles.loginForm}>
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
          <FlexDiv className={styles.credentialsError}>{credentialsErrorMessage}</FlexDiv>
          <div className={styles.circle}>
            <Icon size="large" src={Icons.ARROW_RIGHT} alt="Right Arrow" onClick={onLoginIconClick} />
          </div>
        </FlexDiv>
      </FlexDiv>
    </DesktopBackground>
  );
}

export default Authentication;
