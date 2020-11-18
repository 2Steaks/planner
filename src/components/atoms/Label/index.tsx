/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle, withLogging } from '@project/helpers';
import { styles } from './styles';

interface LabelProps {
  children: ReactNode | ReactNode[];
  htmlFor?: string;
}

const Component: FunctionComponent<LabelProps> = ({
  children,
  ...props
}: LabelProps) => {
  return <label {...props}>{children}</label>;
};

export const Label = compose(
  withStyle(styles),
  withLogging(false),
  withDisplayName('Label')
)(Component);
