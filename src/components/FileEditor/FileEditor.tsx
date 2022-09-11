import AppWindow from 'components/AppWindow';
import Confirm from 'components/Confirm';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import PopUp from 'components/PopUp';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { Icons } from 'models/constants';
import { AppNames, Size } from 'models/enums';
import React, { useEffect, useRef, useState } from 'react';
import { closeApplication, interactedWithApplication } from 'store/applicationsSlice';
import {
  selectAvailableName,
  selectDirectoryPath,
  File,
  selectFileById,
  addFile,
  updateFile,
  deleteFile,
  selectAvailableId,
} from 'store/directorySlice';
import getTimeAndDate from 'utils/date';

import styles from './FileEditor.module.css';

const FILENAME = 'New File';
interface FileEditorProps {
  fileId?: number | null;
}
function FileEditor({ fileId }: FileEditorProps) {
  const directoryPath = useAppSelector(selectDirectoryPath);
  const selectFileByIdSelector = useAppSelector(selectFileById);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File>();
  const [filename, setFilename] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const dateAndTime = file ? getTimeAndDate(file?.updatedAt) : '';
  const dispatch = useAppDispatch();
  const availableFilenameSelector = useAppSelector(selectAvailableName);
  const availableIdSelector = useAppSelector(selectAvailableId);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  useEffect(() => {
    if (isCreated) return;
    let newFilename = '';
    if (fileId) {
      const foundFile = selectFileByIdSelector(fileId);
      if (foundFile) {
        setFile({ ...foundFile });
        textAreaRef.current!.value = foundFile.content;
      }
    } else {
      newFilename = availableFilenameSelector(FILENAME);
      const newId = availableIdSelector;
      setFile({ name: newFilename, content: '', createdAt: Date.now(), updatedAt: Date.now(), id: newId });
    }
    setFilename(file?.name || newFilename);
  }, [availableFilenameSelector, availableIdSelector, file?.name, fileId, isCreated, selectFileByIdSelector]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSavedSuccessfully(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [savedSuccessfully]);
  function onCloseAppHandler() {
    dispatch(closeApplication(AppNames.NOTES));
  }
  function onInteractionHandler() {
    dispatch(interactedWithApplication(AppNames.NOTES));
  }
  function onSaveClickHandler() {
    if (!file) return;

    const copyFile = { ...file };

    copyFile.name = copyFile.name !== filename ? filename : copyFile.name;
    copyFile.content = textAreaRef.current!.value;

    if (!fileId && !isCreated) {
      dispatch(addFile(copyFile));
      setIsCreated(true);
    } else {
      dispatch(updateFile(copyFile));
    }

    setSavedSuccessfully(true);
  }
  function closeConfirm() {
    setIsConfirmOpen(false);
  }
  function onDeleteClickHandler() {
    if (!file) return;
    setIsConfirmOpen(true);
  }
  function deleteItem() {
    if (!file) return;
    dispatch(deleteFile(file.id));
    dispatch(closeApplication(AppNames.NOTES));
  }
  function onTitleInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFilename(event.target.value);
  }
  function onTitleBlurHandler() {
    if (file!.name === filename) return;
    const newFilename = availableFilenameSelector(filename);
    if (newFilename !== filename) {
      setFilename(newFilename);
    }
  }
  return (
    <AppWindow
      onClose={onCloseAppHandler}
      onInteraction={onInteractionHandler}
      title={
        <input
          placeholder="Insert file name"
          value={filename}
          onChange={onTitleInputChangeHandler}
          onBlur={onTitleBlurHandler}
          className={styles.titleInput}
        />
      }
      isResizable
      leftIcons={
        <FlexDiv className={styles.leftIcons}>
          <Icon src={Icons.SAVE} alt="Save icon" size={Size.SMALL} onClick={onSaveClickHandler} />
          <Icon src={Icons.TRASH} alt="Trash icon" size={Size.SMALL} onClick={onDeleteClickHandler} />
        </FlexDiv>
      }
      footerLeft={<FlexDiv>{directoryPath}</FlexDiv>}
      footerRight={<FlexDiv>Last Change: {dateAndTime}</FlexDiv>}>
      {isConfirmOpen && (
        <PopUp isOpen={isConfirmOpen}>
          <Confirm
            title="Delete file"
            content="Are you sure you want to delete this file?"
            onConfirm={deleteItem}
            onCancel={closeConfirm}
          />
        </PopUp>
      )}
      <FlexDiv className={styles.container}>
        <textarea className={styles.textArea} ref={textAreaRef} />
        {savedSuccessfully && <FlexDiv className={styles.savedSuccessfully}>Saved Successfully</FlexDiv>}
      </FlexDiv>
    </AppWindow>
  );
}

export default FileEditor;
