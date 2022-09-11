import classNames from 'classnames';
import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { Icons } from 'models/constants';
import { AppNames, Size } from 'models/enums';
import React, { useState } from 'react';
import { closeApplication, interactedWithApplication, openApplication } from 'store/applicationsSlice';
import {
  deleteFile,
  selectDirectoryName,
  selectDirectoryPath,
  selectFiles,
  selectSortableFields,
  selectSortedFiles,
  updateSortBy,
} from 'store/directorySlice';
import getTimeAndDate from 'utils/date';

import styles from './FileExplorer.module.css';

const APP_NAME = AppNames.FILES;
function FileExplorer() {
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [areLeftIconsDisabled, setAreLeftIconsDisabled] = useState(true);
  const files = useAppSelector(selectFiles);
  const sortedFiles = useAppSelector(selectSortedFiles);
  const directoryName = useAppSelector(selectDirectoryName);
  const directoryPath = useAppSelector(selectDirectoryPath);
  const sortableFieldsSelector = useAppSelector(selectSortableFields);
  const dispatch = useAppDispatch();
  const rightFooter = `${files.length} ${files.length === 1 ? 'file' : 'files'}`;

  function deleteItem() {
    if (selectedFile !== null) {
      dispatch(deleteFile(selectedFile));
    }
  }

  function onCloseAppHandler() {
    dispatch(closeApplication(APP_NAME));
  }

  function onInteractionHandler() {
    dispatch(interactedWithApplication(APP_NAME));
  }

  function renderItems() {
    return sortedFiles.map(item => {
      function selectItem() {
        if (item.id === selectedFile) {
          setSelectedFile(null);
          setAreLeftIconsDisabled(true);
          return;
        }
        setAreLeftIconsDisabled(false);
        setSelectedFile(item.id);
      }
      function openItem() {
        dispatch(openApplication({ name: AppNames.NOTES, id: item.id }));
      }
      const lastModified = getTimeAndDate(item.updatedAt);
      const created = getTimeAndDate(item.createdAt);
      return (
        <FlexDiv
          key={item.id}
          className={classNames(styles.row, item.id === selectedFile ? styles.selected : '', 'notSelectable')}
          onClick={selectItem}
          onDoubleClick={openItem}>
          <div className={styles.rowIcon}>
            <Icon src={Icons.FILE_SOLID} alt="File" size={Size.SMALL} />
          </div>
          <div className={styles.rowItem}>{item.name}</div>
          <div className={styles.rowItem}>{lastModified}</div>
          <div className={styles.rowItem}>{created}</div>
        </FlexDiv>
      );
    });
  }

  return (
    <AppWindow
      onClose={onCloseAppHandler}
      onInteraction={onInteractionHandler}
      isResizable
      title={directoryName}
      leftIcons={
        <Icon src={Icons.TRASH} size={Size.SMALL} alt="Delete" disabled={areLeftIconsDisabled} onClick={deleteItem} />
      }
      footerLeft={<FlexDiv>{directoryPath}</FlexDiv>}
      footerRight={rightFooter}>
      <FlexDiv className={styles.table}>
        <FlexDiv className={styles.header}>
          {sortableFieldsSelector.map(field => {
            function sortFiles() {
              dispatch(updateSortBy(field));
            }
            return (
              <FlexDiv key={field.name} className={classNames(styles.rowItem, 'notSelectable')} onClick={sortFiles}>
                <div>{field.name}</div>
                {field.selected && (
                  <Icon src={field.sortDesc ? Icons.ARROW_UP : Icons.ARROW_DOWN} alt="Sort Icon" size={Size.SMALL} />
                )}
              </FlexDiv>
            );
          })}
        </FlexDiv>
        <div className="divider" />
        <FlexDiv className={styles.body}>{renderItems()}</FlexDiv>
      </FlexDiv>
    </AppWindow>
  );
}

export default FileExplorer;
