/** @format */

import React, { FunctionComponent } from 'react';
import { compose } from 'ramda';
import { IconProps } from '@project/types';
import { withDisplayName, withStyle, withLogging } from '@project/helpers';
import { iconBase } from '@project/theme';

const Component: FunctionComponent<IconProps> = ({
  className,
  ...props
}: IconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 448 448"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M272 184a8 8 0 01-8-8V0h-80v176a8 8 0 01-8 8H0v80h176a8 8 0 018 8v176h80V272a8 8 0 018-8h176v-80zm0 0" />
    </svg>
  );
};

export const PlusIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('PlusIcon')
)(Component);
