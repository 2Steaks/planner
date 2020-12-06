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
      viewBox="0 0 549.76 549.76"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M332.622 454.776c0 31.58-25.582 57.162-57.161 57.162S218.3 486.356 218.3 454.776c0-31.578 25.582-57.16 57.161-57.16s57.161 25.582 57.161 57.16zm32.619-200.735c-17.992-7.589-36.658-12.852-55.814-15.667l97.125 97.063 32.007-32.008c-21.175-21.175-45.839-37.822-73.318-49.388zm-187.823 3.611c-25.398 11.934-48.226 28.212-67.81 48.531l70.38 68.055c20.441-21.176 46.573-34.578 75.031-38.984l-77.601-77.602zM60.955 141.127C39.106 155.57 18.727 172.155 0 190.944l69.217 69.217c18.85-18.85 39.964-34.884 62.914-47.797l-71.176-71.237zM426.319 107.1c-47.798-20.074-98.594-30.294-150.858-30.294-38.127 0-75.398 5.447-111.323 16.157l83.109 83.109c9.303-.918 18.728-1.346 28.213-1.346 77.418 0 150.308 29.988 205.326 84.456l68.973-69.523c-35.74-35.374-77.234-63.159-123.44-82.559zM33.292 77.663l382.561 382.561 39.842-39.842L73.134 37.821 33.292 77.663z" />
    </svg>
  );
};

export const NoWifiIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('NoWifiIcon')
)(Component);
