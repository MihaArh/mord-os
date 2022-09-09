import arrowRight from 'assets/icons/arrow-right.svg';
import eyeDisable from 'assets/icons/eye-disable.svg';
import eyeIcon from 'assets/icons/eye.svg';
import lockIcon from 'assets/icons/lock.svg';
import tick from 'assets/icons/tick.svg';
import userIcon from 'assets/icons/user.svg';
import avatar from 'assets/images/Avatar.png';

export const Icons = {
  EYE_DISABLE: eyeDisable,
  EYE: eyeIcon,
  LOCK: lockIcon,
  USER: userIcon,
  ARROW_RIGHT: arrowRight,
  TICK: tick,
};

export const Images = {
  AVATAR: avatar,
};

export const EMAIL_REGEX =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\s]{2,}))$/;
export const PASSWORD_REGEX = /^.{8,}$/;

export const USER = {
  EMAIL: 'borgoth@mordos.com',
  PASSWORD: '12bindthem',
};
