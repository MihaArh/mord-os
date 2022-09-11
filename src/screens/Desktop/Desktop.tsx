import Camera from 'components/Camera';
import DesktopBackground from 'components/DesktopBackground';
import Dock from 'components/Dock';
import FileEditor from 'components/FileEditor';
import FileExplorer from 'components/FileExplorer';
import FlexDiv from 'components/FlexDiv';
import MenuBar from 'components/MenuBar';
import WebBrowser from 'components/WebBrowser';
import useAppSelector from 'hooks/useAppSelector';
import { AppNames } from 'models/enums';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectOpenedApps } from 'store/applicationsSlice';
import { selectLoggedIn } from 'store/userSlice';

import styles from './Desktop.module.css';

function Desktop() {
  const openedApps = useAppSelector(selectOpenedApps);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  });
  return (
    <DesktopBackground>
      <FlexDiv className={styles.container}>
        <FlexDiv className={styles.menuBarContainer}>
          <MenuBar />
        </FlexDiv>

        <FlexDiv className={styles.contentContainer}>
          {openedApps.map(app => {
            switch (app.name) {
              case AppNames.NOTES:
                return <FileEditor key={app.name} fileId={app.fileId} />;
              case AppNames.FILES:
                return <FileExplorer key={app.name} />;
              case AppNames.BROWSER:
                return <WebBrowser key={app.name} />;
              case AppNames.CAMERA:
                return <Camera key={app.name} />;
              default:
                return null;
            }
          })}
        </FlexDiv>
        <FlexDiv className={styles.dockContainer}>
          <Dock />
        </FlexDiv>
      </FlexDiv>
    </DesktopBackground>
  );
}

export default Desktop;
