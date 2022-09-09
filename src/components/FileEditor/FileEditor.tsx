import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import { Icons } from 'models/constants';
import React from 'react';

import styles from './FileEditor.module.css';

const TITLE = 'New File';

function FileEditor() {
  function onSaveClickHandler() {
    console.log('save');
  }
  function onDeleteClickHandler() {
    console.log('delete');
  }
  return (
    <AppWindow
      title={TITLE}
      isResizable
      leftIcons={
        <FlexDiv className={styles.leftIcons}>
          <Icon src={Icons.SAVE} alt="Save icon" size="small" onClick={onSaveClickHandler} />
          <Icon src={Icons.TRASH} alt="Trash icon" size="small" onClick={onDeleteClickHandler} />
        </FlexDiv>
      }
      footer={
        <FlexDiv className={styles.footer}>
          <FlexDiv className={styles.footerLeft}>MordOs\Files\Test\New File Name</FlexDiv>
          <FlexDiv className={styles.footerRight}>Last Change: 09/28/2021, 10:44 </FlexDiv>
        </FlexDiv>
      }>
      <FlexDiv className={styles.container}>
        <textarea className={styles.textArea} />
      </FlexDiv>
    </AppWindow>
  );
}

export default FileEditor;
