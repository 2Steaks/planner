/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { styles } from './styles';

export enum DrawerPosition {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}

export interface DrawerProps {
  children: ReactNode | ReactNode[];
  position: DrawerPosition;
}

const Component: FunctionComponent<DrawerProps> = ({
  children,
  ...props
}: DrawerProps) => {
  return <div {...props}>{children}</div>;
};

export const Drawer = compose(
  withStyle(styles),
  withDisplayName('Drawer')
)(Component);
