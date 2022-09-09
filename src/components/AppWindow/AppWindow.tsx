import classNames from 'classnames';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import { Icons } from 'models/constants';
import React, { useEffect, useRef, useState } from 'react';

import styles from './AppWindow.module.css';

interface AppWindowProps {
  children: React.ReactNode;
  title: string;
  isResizable?: boolean;
  leftIcons?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
}
function AppWindow({ children, title, onClose, onMinimize, footer, isResizable = false, leftIcons }: AppWindowProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const transform = `translateX(${windowPosition.x}px) translateY(${windowPosition.y}px)`;

  useEffect(() => {
    const header = headerRef.current;

    function handleMouseDown() {
      setIsDragging(true);
    }
    function handleMouseUp() {
      setIsDragging(false);
    }

    function handleMouseMove(event: MouseEvent) {
      if (isDragging) {
        setWindowPosition(prevPosition => ({
          x: prevPosition.x + event.movementX,
          y: prevPosition.y + event.movementY,
        }));
      }
    }

    header!.addEventListener('mousemove', handleMouseMove);
    header!.addEventListener('mousedown', handleMouseDown);
    header!.addEventListener('mouseup', handleMouseUp);
    return () => {
      header!.removeEventListener('mousemove', handleMouseMove);
      header!.removeEventListener('mousedown', handleMouseDown);
      header!.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  return (
    <FlexDiv
      ref={windowRef}
      className={classNames(styles.container, isResizable ? styles.resizable : '')}
      style={{
        transform,
      }}>
      <FlexDiv className={styles.header} ref={headerRef}>
        <FlexDiv className={styles.leftIcons}>{leftIcons}</FlexDiv>
        <FlexDiv className={styles.title}>{title}</FlexDiv>
        <FlexDiv className={styles.rightIcons}>
          <Icon size="small" src={Icons.MINIMIZE} alt="Minimize icon" onClick={onMinimize} />
          <Icon size="small" src={Icons.CLOSE} alt="Close icon" onClick={onClose} />
        </FlexDiv>
      </FlexDiv>

      <div className={styles.divider} />
      <FlexDiv className={styles.content}>{children}</FlexDiv>
      {footer && (
        <>
          <div className={styles.divider} />
          <FlexDiv className={styles.footer}>{footer}</FlexDiv>
        </>
      )}
    </FlexDiv>
  );
}

export default React.memo(AppWindow);