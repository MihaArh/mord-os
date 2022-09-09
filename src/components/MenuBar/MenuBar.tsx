import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import { Icons } from 'models/constants';
import React, { useEffect, useState } from 'react';

import styles from './MenuBar.module.css';

function MenuBar() {
  const [date, setDate] = useState(new Date());
  const formattedTime = date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
  const localizedDate = date.toLocaleString('dafault', { weekday: 'short', month: 'short', day: 'numeric' });

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <FlexDiv className={styles.container}>
      <Icon src={Icons.LOGO} alt="Logo" size="small" />
      <FlexDiv className={styles.dateTimeContainer}>
        <div>{localizedDate}</div>
        <div>{formattedTime}</div>
      </FlexDiv>
    </FlexDiv>
  );
}

export default MenuBar;
