import classNames from 'classnames';
import FlexDiv from 'components/FlexDiv';
import React, { FormEvent, useEffect, useState } from 'react';

import styles from './TextInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (text: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorMessage?: string;
  hideText?: boolean;
}
function TextInput({
  onValueChange,
  leftIcon,
  rightIcon,
  errorMessage,
  hideText = false,
  ...restProps
}: TextInputProps) {
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

  function onInput(e: FormEvent<HTMLInputElement>) {
    if (onValueChange) {
      onValueChange((e.target as HTMLInputElement).value);
    }
  }

  return (
    <FlexDiv
      className={classNames(
        styles.container,
        isFocused ? styles.inputFocus : '',
        errorMessage ? styles.inputError : '',
      )}>
      {leftIcon && (
        <>
          <div className={styles.leftIcon}>{leftIcon}</div>
          <div className={styles.divider} />
        </>
      )}
      <div className={styles.inputDiv}>
        <input
          type={inputType}
          onInput={onInput}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          className={styles.input}
          {...restProps}
        />
        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
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
