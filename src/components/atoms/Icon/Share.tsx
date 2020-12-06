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
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M406 332c-29.641 0-55.761 14.581-72.167 36.755L191.99 296.124c2.355-8.027 4.01-16.346 4.01-25.124 0-11.906-2.441-23.225-6.658-33.636l148.445-89.328C354.307 167.424 378.589 180 406 180c49.629 0 90-40.371 90-90S455.629 0 406 0s-90 40.371-90 90c0 11.437 2.355 22.286 6.262 32.358l-148.887 89.59C156.869 193.136 132.937 181 106 181c-49.629 0-90 40.371-90 90s40.371 90 90 90c30.13 0 56.691-15.009 73.035-37.806l141.376 72.395C317.807 403.995 316 412.75 316 422c0 49.629 40.371 90 90 90s90-40.371 90-90-40.371-90-90-90z" />
    </svg>
  );
};

export const ShareIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('ShareIcon')
)(Component);
