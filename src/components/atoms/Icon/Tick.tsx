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
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M.828 13.336c-.261.304-.388.691-.357 1.091s.215.764.52 1.024l7.403 6.346a1.49 1.49 0 001.108.355c.405-.036.77-.229 1.028-.542L23.192 6.199c.254-.31.373-.7.334-1.099a1.496 1.496 0 00-.541-1.014l-2.318-1.904a1.503 1.503 0 00-2.111.207L8.811 14.25l-3.916-3.355a1.504 1.504 0 00-2.115.163z" />
    </svg>
  );
};

export const TickIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('TickIcon')
)(Component);
