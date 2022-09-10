import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React from 'react';
import { selectApps, openApplication } from 'store/applicationsSlice';

import styles from './Dock.module.css';

function Dock() {
  const apps = useAppSelector(selectApps);
  const dispatch = useAppDispatch();

  function renderDockIcons() {
    return apps.map(app => {
      function openApp() {
        dispatch(openApplication({ name: app.name, id: null }));
      }
      return (
        <FlexDiv className={styles.iconContainer} key={app.name}>
          <div className={styles.tooltip}>{app.tooltip}</div>
          <Icon
            size="large"
            src={app.icon}
            alt={app.name}
            onClick={openApp}
            className={styles.icon}
            data-text={app.tooltip}
          />
          <div className={styles.activeApp} />
        </FlexDiv>
      );
    });
  }
  return (
    <FlexDiv className={styles.container}>
      <FlexDiv className={styles.iconsContainer}>{renderDockIcons()}</FlexDiv>
    </FlexDiv>
  );
}

export default Dock;
