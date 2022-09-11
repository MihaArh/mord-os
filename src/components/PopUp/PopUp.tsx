import React from 'react';
import ReactDOM from 'react-dom';

import styles from './PopUp.module.css';

interface PopUpProps {
  isOpen: boolean;
  children: React.ReactNode;
}
const CONFIRM_MODAL_ROOT_ELEMENT = document.getElementById('pop-up-root');
function PopUp({ isOpen, children }: PopUpProps) {
  if (!isOpen || !CONFIRM_MODAL_ROOT_ELEMENT) {
    return null;
  }

  return ReactDOM.createPortal(<div className={styles.container}>{children}</div>, CONFIRM_MODAL_ROOT_ELEMENT);
}

export default PopUp;
