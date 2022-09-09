import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import { Icons } from 'models/constants';
import React from 'react';

import styles from './Dock.module.css';

const APPS = [
  {
    name: 'Notes',
    icon: Icons.NOTES,
    tooltip: 'New Note',
    component: '',
    onClick: () => {
      console.log('Notes');
    },
  },
  {
    name: 'Files',
    icon: Icons.FOLDER,
    tooltip: 'Files',
    component: '',
    onClick: () => {
      console.log('Files');
    },
  },
  {
    name: 'Browser',
    icon: Icons.BROWSER,
    tooltip: 'Browser',
    component: '',
    onClick: () => {
      console.log('Browser');
    },
  },
  {
    name: 'Camera',
    icon: Icons.CAMERA,
    tooltip: 'Camera',
    component: '',
    onClick: () => {
      console.log('Camera');
    },
  },
  {
    name: 'Gallery',
    icon: Icons.IMAGE,
    tooltip: 'Gallery',
    component: '',
    onClick: () => {
      console.log('Gallery');
    },
  },
  {
    name: 'News',
    icon: Icons.NEWS,
    tooltip: 'News',
    component: '',
    onClick: () => {
      console.log('News');
    },
  },
];
function Dock() {
  function renderDockIcons() {
    return APPS.map(app => (
      <FlexDiv className={styles.iconContainer} key={app.name}>
        <div className={styles.tooltip}>{app.tooltip}</div>
        <Icon
          size="large"
          src={app.icon}
          alt={app.name}
          onClick={app.onClick}
          className={styles.icon}
          data-text={app.tooltip}
        />
        <div className={styles.activeApp} />
      </FlexDiv>
    ));
  }
  return (
    <FlexDiv className={styles.container}>
      <FlexDiv className={styles.iconsContainer}>{renderDockIcons()}</FlexDiv>
    </FlexDiv>
  );
}

export default Dock;
