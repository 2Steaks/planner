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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488.9 488.9"
      {...props}
    >
      <path d="M239.15 0c31.9 0 57.7 25.8 57.7 57.7s-25.8 57.7-57.7 57.7-57.7-25.8-57.7-57.7S207.25 0 239.15 0zm52.5 151.6h-97.7c-19 0-34.3 15.4-34.3 34.3 0 19 15.4 34.3 34.3 34.3h3.4v200h-37.7v68.7h169.6v-68.7h-37.5V151.6h-.1z" />
    </svg>
  );
};

export const InfoIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('InfoIcon')
)(Component);
