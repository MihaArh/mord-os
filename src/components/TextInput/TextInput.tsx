import FlexDiv from 'components/FlexDiv';
import React from 'react';

import styles from './TextInput.module.css';

interface TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  errorMessage?: string;
  hideText?: boolean;
}
function TextInput({ leftIcon, rightIcon, placeholder, errorMessage, hideText = false }: TextInputProps) {
  const inputType = hideText ? 'password' : 'text';
  return (
    <FlexDiv className={styles.container}>
      {leftIcon && (
        <>
          <div className={styles.leftIcon}>{leftIcon}</div>
          <div className={styles.divider} />
        </>
      )}
      <div className={styles.inputDiv}>
        <input type={inputType} name="email" className={styles.input} placeholder={placeholder} />
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
