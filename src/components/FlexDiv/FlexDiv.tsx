import classNames from 'classnames';
import React from 'react';

import styles from './FlexDiv.module.css';

interface FlexDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const FlexDiv = React.forwardRef<HTMLDivElement, FlexDivProps>((props, ref) => {
  const { children, className, ...restProps } = props;
  return (
    <div className={classNames(styles.container, className)} ref={ref} {...restProps}>
      {children}
    </div>
  );
});

export default FlexDiv;
