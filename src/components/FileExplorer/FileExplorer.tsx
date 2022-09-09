import classNames from 'classnames';
import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { Icons } from 'models/constants';
import React, { useState } from 'react';
import { deleteFile, selectDirectoryName, selectDirectoryPath, selectFiles } from 'store/directorySlice';

import styles from './FileExplorer.module.css';

function FileExplorer() {
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [areLeftIconsDisabled, setAreLeftIconsDisabled] = useState(true);
  const files = useAppSelector(selectFiles);
  const directoryName = useAppSelector(selectDirectoryName);
  const directoryPath = useAppSelector(selectDirectoryPath);
  const dispatch = useAppDispatch();
  const rightFooter = `${files.length} ${files.length === 1 ? 'file' : 'files'}`;
  function deleteItem() {
    if (selectedFile !== null) {
      dispatch(deleteFile(selectedFile));
    }
  }
  function renderItems() {
    return files.map(item => {
      function selectItem() {
        if (item.id === selectedFile) {
          setSelectedFile(null);
          setAreLeftIconsDisabled(true);
          return;
        }
        setAreLeftIconsDisabled(false);
        setSelectedFile(item.id);
      }
      function openItem() {}
      return (
        <FlexDiv
          key={item.id}
          className={classNames(styles.row, item.id === selectedFile ? styles.selected : '')}
          onClick={selectItem}
          onDoubleClick={openItem}>
          <div className={styles.rowIcon}>
            <Icon src={Icons.FILE_SOLID} alt="File" size="small" />
          </div>
          <div className={styles.rowItem}>{item.name}</div>
          <div className={styles.rowItem}>{item.updatedAt}</div>
          <div className={styles.rowItem}>{item.createdAt}</div>
        </FlexDiv>
      );
    });
  }

  return (
    <AppWindow
      isResizable
      title={directoryName}
      leftIcons={
        <Icon src={Icons.TRASH} size="small" alt="Delete" disabled={areLeftIconsDisabled} onClick={deleteItem} />
      }
      footerLeft={<FlexDiv>{directoryPath}</FlexDiv>}
      footerRight={rightFooter}>
      <FlexDiv className={styles.table}>
        <FlexDiv className={styles.header}>
          <div className={styles.rowItem}>Name</div>
          <div className={styles.rowItem}>Last Modified</div>
          <div className={styles.rowItem}>Created</div>
        </FlexDiv>
        <div className="divider" />
        <FlexDiv className={styles.body}>{renderItems()}</FlexDiv>
      </FlexDiv>
    </AppWindow>
  );
}

export default FileExplorer;
