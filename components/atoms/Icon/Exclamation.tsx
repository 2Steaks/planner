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
      viewBox="0 0 301.691 301.691"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M119.151 0L129.6 218.406h42.46L182.54 0zM130.563 261.168h40.525v40.523h-40.525z" />
    </svg>
  );
};

export const ExclamationIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('ExclamationIcon')
)(Component);
