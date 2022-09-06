import classNames from 'classnames';
import React from 'react';

import style from './FlexDiv.module.css';

interface FlexDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}
function FlexDiv({ children, className, ...restProps }: FlexDivProps) {
  return (
    <div className={classNames(style.container, className)} {...restProps}>
      {children}
    </div>
  );
}

export default FlexDiv;
