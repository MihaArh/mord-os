import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import TextInput from 'components/TextInput';
import useAppDispatch from 'hooks/useAppDispatch';
import { Icons } from 'models/constants';
import { AppNames, Size } from 'models/enums';
import React from 'react';
import { closeApplication } from 'store/applicationsSlice';

import styles from './WebBrowser.module.css';

const APP_NAME = AppNames.BROWSER;
function WebBrowser() {
  const dispatch = useAppDispatch();
  function onCloseAppHandler() {
    dispatch(closeApplication(APP_NAME));
  }

  return (
    <AppWindow title={APP_NAME} onClose={onCloseAppHandler} isResizable>
      <FlexDiv className={styles.container}>
        <TextInput leftIcon={<Icon size={Size.SMALL} src={Icons.GOOGLE} alt="Google" />} />
      </FlexDiv>
    </AppWindow>
  );
}

export default WebBrowser;
