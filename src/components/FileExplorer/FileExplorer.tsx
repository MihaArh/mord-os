import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import useAppSelector from 'hooks/useAppSelector';
import { Icons } from 'models/constants';
import React from 'react';
import { selectDirectoryName, selectDirectoryPath, selectFiles } from 'store/directorySlice';

import styles from './FileExplorer.module.css';

function FileExplorer() {
  const files = useAppSelector(selectFiles);
  const directoryName = useAppSelector(selectDirectoryName);
  const directoryPath = useAppSelector(selectDirectoryPath);

  const rightFooter = `${files.length} ${files.length === 1 ? 'file' : 'files'}`;

  function renderItems() {
    return files.map(item => (
      <FlexDiv key={`${item.name}${item.createdAt}`} className={styles.row}>
        <div className={styles.rowIcon}>
          <Icon src={Icons.FILE_SOLID} alt="File" size="small" />
        </div>
        <div className={styles.rowItem}>{item.name}</div>
        <div className={styles.rowItem}>{item.updatedAt}</div>
      </FlexDiv>
    ));
  }

  return (
    <AppWindow
      isResizable
      title={directoryName}
      footerLeft={<FlexDiv>{directoryPath}</FlexDiv>}
      footerRight={rightFooter}>
      <FlexDiv className={styles.table}>
        <FlexDiv className={styles.header}>
          <div className={styles.rowItem}>Name</div>
          <div className={styles.rowItem}>Last Modified</div>
          <div className={styles.rowItem}>Kind</div>
        </FlexDiv>
        <div className="divider" />
        <FlexDiv className={styles.body}>{!files ? 'Directory is Empty' : renderItems()}</FlexDiv>
      </FlexDiv>
    </AppWindow>
  );
}

export default FileExplorer;
