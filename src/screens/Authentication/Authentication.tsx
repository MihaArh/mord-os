import classNames from 'classnames';
import DesktopBackground from 'components/DesktopBackground';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import TextInput from 'components/TextInput';
import useAppDispatch from 'hooks/useAppDispatch';
import { EMAIL_REGEX, Icons, Images } from 'models/constants';
import { Size } from 'models/enums';
import React, { useState } from 'react';
import { login } from 'store/userSlice';

import styles from './Authentication.module.css';

function Authentication() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

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
    setCredentialsErrorMessage('');
  }

  function onPasswordChangeHandler(text: string) {
    setPassword(text);
    setCredentialsErrorMessage('');
  }

  function onPasswordVisibilityClick() {
    setHidePassword(prevPasswordVisibility => !prevPasswordVisibility);
  }

  function onLoginIconClick() {
    validateEmail();
    validatePassword();
    if (email !== process.env.REACT_APP_USER_EMAIL || password !== process.env.REACT_APP_USER_PASSWORD) {
      setCredentialsErrorMessage('Invalid email or password');
      return;
    }
    dispatch(login({ email, password }));
    setIsLoginSuccessful(true);
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
            hasError={!!emailErrorMessage || !!credentialsErrorMessage}
            required
            leftIcon={<Icon size={Size.SMALL} src={Icons.USER} alt="User Icon" className={styles.leftIcon} />}
            placeholder="Email"
          />
          <TextInput
            required
            onValueChange={onPasswordChangeHandler}
            onBlur={validatePassword}
            errorMessage={passwordErrorMessage}
            hasError={!!passwordErrorMessage || !!credentialsErrorMessage}
            leftIcon={<Icon size={Size.SMALL} src={Icons.LOCK} alt="Lock Icon" className={styles.leftIcon} />}
            rightIcon={
              <Icon
                size={Size.SMALL}
                src={hidePassword ? Icons.EYE : Icons.EYE_DISABLE}
                onClick={onPasswordVisibilityClick}
                alt="Hide Password"
                className={styles.leftIcon}
              />
            }
            placeholder="Password"
            hideText={hidePassword}
          />
          {(!emailErrorMessage || !passwordErrorMessage) && (
            <FlexDiv className={styles.credentialsError}>{credentialsErrorMessage}</FlexDiv>
          )}
          <div
            className={classNames(
              credentialsErrorMessage ? styles.loginFailed : '',
              isLoginSuccessful ? styles.loginSuccessful : '',
              styles.circle,
            )}>
            <Icon
              size={Size.LARGE}
              src={isLoginSuccessful ? Icons.TICK : Icons.ARROW_RIGHT}
              alt="Right Arrow"
              onClick={onLoginIconClick}
            />
          </div>
        </FlexDiv>
      </FlexDiv>
    </DesktopBackground>
  );
}

export default Authentication;
