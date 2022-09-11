import AppWindow from 'components/AppWindow';
import FlexDiv from 'components/FlexDiv';
import Icon from 'components/Icon';
import { Icons } from 'models/constants';
import { AppNames, Size } from 'models/enums';
import React, { useEffect, useRef } from 'react';

import styles from './Camera.module.css';

const APP_NAME = AppNames.CAMERA;
const EXPECTED_VIDEO_WIDTH = 640;
const EXPECTED_VIDEO_HEIGHT = 480;
function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (videoRef.current) {
      const option = {
        video: { width: { ideal: EXPECTED_VIDEO_WIDTH }, height: { ideal: EXPECTED_VIDEO_HEIGHT } },
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(option).then(stream => {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  function onImageCaptureHandler() {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = EXPECTED_VIDEO_WIDTH;
    canvas.height = EXPECTED_VIDEO_HEIGHT;
    const context = canvasRef.current.getContext('2d');
    if (context) {
      context.drawImage(videoRef.current, 0, 0, EXPECTED_VIDEO_WIDTH, EXPECTED_VIDEO_HEIGHT);
      const data = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = data;
      link.click();
    }
  }

  return (
    <AppWindow title={APP_NAME}>
      <FlexDiv className={styles.container}>
        <video className={styles.video} ref={videoRef}>
          <track kind="captions" />
        </video>
        <canvas ref={canvasRef} hidden />
        <div className={styles.controls}>
          <Icon src={Icons.CAMERA} alt="Capture " size={Size.LARGE} onClick={onImageCaptureHandler} />
        </div>
      </FlexDiv>
    </AppWindow>
  );
}

export default Camera;
