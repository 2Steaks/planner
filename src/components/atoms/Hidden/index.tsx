/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { styles } from './styles';

export interface HiddenProps {
  children: ReactNode | ReactNode[];
  condition: boolean;
}

const Component: FunctionComponent<HiddenProps> = ({
  children,
  ...props
}: HiddenProps) => {
  return <div {...props}>{children}</div>;
};

export const Hidden = compose(
  withStyle(styles),
  withDisplayName('Hidden')
)(Component);
