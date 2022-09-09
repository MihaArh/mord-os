import classNames from 'classnames';
import FlexDiv from 'components/FlexDiv';
import React, { useEffect, useState } from 'react';

import styles from './TextInput.module.css';

interface TextInputProps {
  onChange?: () => void;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  errorMessage?: string;
  hideText?: boolean;
}
function TextInput({ onChange, leftIcon, rightIcon, placeholder, errorMessage, hideText = false }: TextInputProps) {
  const [inputType, setInputType] = useState('text');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputType(hideText ? 'password' : 'text');
  }, [hideText]);

  function onFocusHandler() {
    setIsFocused(true);
  }

  function onBlurHandler() {
    setIsFocused(false);
  }

  return (
    <FlexDiv className={classNames(styles.container, isFocused ? styles.inputFocus : '')}>
      {leftIcon && (
        <>
          <div className={styles.leftIcon}>{leftIcon}</div>
          <div className={styles.divider} />
        </>
      )}
      <div className={styles.inputDiv}>
        <input
          type={inputType}
          name="email"
          onInput={onChange}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          className={styles.input}
          placeholder={placeholder}
        />
        {errorMessage && <span>{errorMessage}</span>}
      </div>
      {rightIcon && (
        <>
          <div className={styles.rightIcon}>{rightIcon}</div>
          <div className={styles.divider} />
        </>
      )}
    </FlexDiv>
  );
}

export default React.memo(TextInput);
