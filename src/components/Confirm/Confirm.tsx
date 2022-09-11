import classNames from 'classnames';
import FlexDiv from 'components/FlexDiv';
import React from 'react';

import styles from './Confirm.module.css';

interface ConfirmProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}
function Confirm({ title, content, onConfirm, onCancel }: ConfirmProps) {
  return (
    <FlexDiv className={styles.container}>
      <div className={styles.window}>
        <FlexDiv>{title}</FlexDiv>
        <div className="divider" />
        <FlexDiv>{content}</FlexDiv>
        <div className="divider" />
        <FlexDiv className={styles.footer}>
          <button onClick={onConfirm} type="button" className={classNames(styles.button, styles.confirmButton)}>
            Confirm
          </button>
          <button onClick={onCancel} type="button" className={classNames(styles.button, styles.cancelButton)}>
            Cancel
          </button>
        </FlexDiv>
      </div>
    </FlexDiv>
  );
}

export default Confirm;
