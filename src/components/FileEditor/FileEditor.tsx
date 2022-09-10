import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { Icons } from 'models/constants';
import React, { useEffect, useRef, useState } from 'react';
import { closeApplication, interactedWithApplication } from 'store/applicationsSlice';
import { selectAvailableName, selectDirectoryPath, addFile, File, updateFile } from 'store/directorySlice';
import getTimeAndDate from 'utils/date';

import styles from './FileEditor.module.css';

const APP_NAME = 'Notes';
const FILENAME = 'New File';
interface FileEditorProps {
  isNewFile?: boolean;
  filename?: string;
}
function FileEditor({ isNewFile, filename = FILENAME }: FileEditorProps) {
  const directoryPath = useAppSelector(selectDirectoryPath);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [lastChanged, setLastChanged] = useState(0);
  const [newFilename, setNewFilename] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const dateAndTime = getTimeAndDate(lastChanged);
  const dispatch = useAppDispatch();
  const availableFilename = useAppSelector(selectAvailableName)(filename);

  useEffect(() => {
    if (isNewFile && !isSaved) {
      setLastChanged(Date.now());
      setNewFilename(availableFilename);
    }
  }, [availableFilename, isNewFile, isSaved]);
  function onCloseAppHandler() {
    dispatch(closeApplication(APP_NAME));
  }
  function onInteractionHandler() {
    dispatch(interactedWithApplication(APP_NAME));
  }
  function onSaveClickHandler() {
    if (!isSaved) {
      const file: File = {
        name: newFilename,
        content: textAreaRef.current!.value,
        opened: true,
        createdAt: lastChanged,
        updatedAt: lastChanged,
        id: 0,
      };
      dispatch(addFile(file));
      setIsSaved(true);
      return;
    }

    const file: Partial<File> = {
      name: newFilename,
      content: textAreaRef.current!.value,
      opened: true,
    };
    dispatch(updateFile(file));
  }
  function onDeleteClickHandler() {}
  return (
    <AppWindow
      onClose={onCloseAppHandler}
      onInteraction={onInteractionHandler}
      title={newFilename}
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
      </FlexDiv>
    </AppWindow>
  );
}

export default FileEditor;
