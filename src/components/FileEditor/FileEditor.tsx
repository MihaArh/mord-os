import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { AppNames, Icons } from 'models/constants';
import React, { useEffect, useRef, useState } from 'react';
import { closeApplication, interactedWithApplication } from 'store/applicationsSlice';
import {
  selectAvailableName,
  selectDirectoryPath,
  File,
  selectFileById,
  addFile,
  updateFile,
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
  const [isCreated, setIsCreated] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const dateAndTime = file ? getTimeAndDate(file?.updatedAt) : '';
  const dispatch = useAppDispatch();
  const availableFilenameSelector = useAppSelector(selectAvailableName);

  useEffect(() => {
    if (isCreated) return;
    if (fileId) {
      const foundFile = selectFileByIdSelector(fileId);
      if (foundFile) {
        setFile({ ...foundFile });
        textAreaRef.current!.value = foundFile.content;
      }
    } else {
      const newFilename = availableFilenameSelector(FILENAME);
      setFile({ name: newFilename, content: '', createdAt: Date.now(), updatedAt: Date.now(), id: 0 });
    }
  }, [availableFilenameSelector, fileId, isCreated, selectFileByIdSelector]);
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
    file.content = textAreaRef.current!.value;
    if (!fileId && !isCreated) {
      dispatch(addFile(file));
      setIsCreated(true);
      return;
    }
    dispatch(updateFile(file));
    setSavedSuccessfully(true);
  }
  function onDeleteClickHandler() {}
  return (
    <AppWindow
      onClose={onCloseAppHandler}
      onInteraction={onInteractionHandler}
      title={file?.name}
      isResizable
      leftIcons={
        <FlexDiv className={styles.leftIcons}>
          <Icon src={Icons.SAVE} alt="Save icon" size="small" onClick={onSaveClickHandler} />
          <Icon src={Icons.TRASH} alt="Trash icon" size="small" onClick={onDeleteClickHandler} />
        </FlexDiv>
      }
      footerLeft={<FlexDiv>{directoryPath}</FlexDiv>}
      footerRight={<FlexDiv>Last Change: {dateAndTime}</FlexDiv>}>
      <FlexDiv className={styles.container}>
        <textarea className={styles.textArea} ref={textAreaRef} />
        {savedSuccessfully && <FlexDiv className={styles.savedSuccessfully}>Saved Successfully</FlexDiv>}
      </FlexDiv>
    </AppWindow>
  );
}

export default FileEditor;
