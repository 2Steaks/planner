/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle, withLogging } from '@project/helpers';
import { styles } from './styles';

export enum PaperTheme {
  LIGHT,
  DARK
}

export interface PaperProps {
  border?: boolean;
  children: ReactNode | ReactNode[];
  className?: string;
  shadow?: boolean;
  theme?: PaperTheme;
}

const Component: FunctionComponent<PaperProps> = ({
  children,
  ...props
}: PaperProps) => {
  return <div {...props}>{children}</div>;
};

export const Paper = compose(
  withStyle(styles),
  withLogging(false),
  withDisplayName('Paper')
)(Component);
