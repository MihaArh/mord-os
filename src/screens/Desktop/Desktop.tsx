import AppWindow from 'components/AppWindow';
import DesktopBackground from 'components/DesktopBackground';
import Dock from 'components/Dock';
import FlexDiv from 'components/FlexDiv';
import MenuBar from 'components/MenuBar';
import React from 'react';

import styles from './Desktop.module.css';

function Desktop() {
  return (
    <DesktopBackground>
      <FlexDiv className={styles.container}>
        <FlexDiv className={styles.menuBarContainer}>
          <MenuBar />
        </FlexDiv>
        <FlexDiv className={styles.contentContainer}>
          <AppWindow title="App" isResizable>
            <div>Test</div>
          </AppWindow>
        </FlexDiv>
        <FlexDiv className={styles.dockContainer}>
          <Dock />
        </FlexDiv>
      </FlexDiv>
    </DesktopBackground>
  );
}

export default Desktop;
