/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle, withLogging } from '@project/helpers';
import { When } from '@project/components/atoms/When';
import { ProgressEl, Span, styles } from './styles';

export interface ProgressProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  color?: string;
  isLoading: boolean;
  max?: string;
  value?: string;
}

const Component: FunctionComponent<ProgressProps> = ({
  children,
  className,
  max = '100',
  value,
  ...props
}: ProgressProps) => {
  return (
    <div className={className}>
      <ProgressEl max={max} value={value} {...props} />
      <When condition={Boolean(children)}>
        <Span>{children}</Span>
      </When>
    </div>
  );
};

export const Progress = compose(
  withStyle(styles, ['color']),
  withLogging(false),
  withDisplayName('Progress')
)(Component);
