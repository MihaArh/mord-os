import arrowDown from 'assets/icons/arrow-down.svg';
import arrowLeft from 'assets/icons/arrow-left.svg';
import arrowRight from 'assets/icons/arrow-right.svg';
import arrowUp from 'assets/icons/arrow-up.svg';
import browser from 'assets/icons/browser.svg';
import camera from 'assets/icons/camera.svg';
import close from 'assets/icons/close.svg';
import eyeDisable from 'assets/icons/eye-disable.svg';
import eyeIcon from 'assets/icons/eye.svg';
import fileSolid from 'assets/icons/file-solid.svg';
import folder from 'assets/icons/folder.svg';
import google from 'assets/icons/google.svg';
import image from 'assets/icons/image.svg';
import lock from 'assets/icons/lock.svg';
import logo from 'assets/icons/logo.svg';
import minimize from 'assets/icons/minimize.svg';
import news from 'assets/icons/news.svg';
import notes from 'assets/icons/notes.svg';
import pencil from 'assets/icons/pencil.svg';
import save from 'assets/icons/save.svg';
import tick from 'assets/icons/tick.svg';
import trash from 'assets/icons/trash.svg';
import user from 'assets/icons/user.svg';
import avatar from 'assets/images/Avatar.png';

export const Icons = {
  EYE_DISABLE: eyeDisable,
  EYE: eyeIcon,
  LOCK: lock,
  USER: user,
  ARROW_RIGHT: arrowRight,
  TICK: tick,
  LOGO: logo,
  CAMERA: camera,
  FOLDER: folder,
  BROWSER: browser,
  IMAGE: image,
  NEWS: news,
  NOTES: notes,
  CLOSE: close,
  MINIMIZE: minimize,
  SAVE: save,
  TRASH: trash,
  FILE_SOLID: fileSolid,
  ARROW_UP: arrowUp,
  ARROW_DOWN: arrowDown,
  ARROW_LEFT: arrowLeft,
  PENCIL: pencil,
  GOOGLE: google,
};

export const Images = {
  AVATAR: avatar,
};

export const EMAIL_REGEX =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\s]{2,}))$/;
export const PASSWORD_REGEX = /^.{8,}$/;
