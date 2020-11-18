/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withRef, withStyle } from '@project/helpers';
import { styles } from './styles';

export interface HiddenProps {
  children: ReactNode | ReactNode[];
  condition: boolean;
  forwardRef?: any;
}

const Component: FunctionComponent<HiddenProps> = ({
  children,
  forwardRef,
  ...props
}: HiddenProps) => {
  return (
    <div ref={forwardRef} {...props}>
      {children}
    </div>
  );
};

export const Hidden = compose(
  withStyle(styles),
  withRef,
  withDisplayName('Hidden')
)(Component);
