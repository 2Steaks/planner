/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { styles } from './styles';

export interface BreakoutProps {
  children: ReactNode | ReactNode[];
  isSticky: boolean;
}

const Component: FunctionComponent<BreakoutProps> = ({
  children,
  ...props
}: BreakoutProps) => {
  return <div {...props}>{children}</div>;
};

export const AppBar = compose(
  withStyle(styles),
  withDisplayName('AppBar')
)(Component);
