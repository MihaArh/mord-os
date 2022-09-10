import DesktopBackground from 'components/DesktopBackground';
import Dock from 'components/Dock';
import FileEditor from 'components/FileEditor';
import FileExplorer from 'components/FileExplorer';
import FlexDiv from 'components/FlexDiv';
import MenuBar from 'components/MenuBar';
import useAppSelector from 'hooks/useAppSelector';
import React from 'react';
import { selectOpenedApps } from 'store/applicationsSlice';

import styles from './Desktop.module.css';

const APP_COMPONENTS = {
  Notes: <FileEditor />,
  Files: <FileExplorer />,
};

function Desktop() {
  const oppenedApps = useAppSelector(selectOpenedApps);
  return (
    <DesktopBackground>
      <FlexDiv className={styles.container}>
        <FlexDiv className={styles.menuBarContainer}>
          <MenuBar />
        </FlexDiv>
        <FlexDiv className={styles.contentContainer}>
          {oppenedApps.map(app => {
            switch (app.name) {
              case 'Notes':
                return <FileEditor key={app.name} />;
              case 'Files':
                return <FileExplorer key={app.name} />;
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
