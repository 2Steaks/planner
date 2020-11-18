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
      <path d="M446 40h-46V16c0-8.836-7.163-16-16-16s-16 7.164-16 16v24H144V16c0-8.836-7.163-16-16-16s-16 7.164-16 16v24H66C29.607 40 0 69.607 0 106v340c0 36.393 29.607 66 66 66h380c36.393 0 66-29.607 66-66V106c0-36.393-29.607-66-66-66zM66 72h46v16c0 8.836 7.163 16 16 16s16-7.164 16-16V72h224v16c0 8.836 7.163 16 16 16s16-7.164 16-16V72h46c18.748 0 34 15.252 34 34v38H32v-38c0-18.748 15.252-34 34-34zm380 408H66c-18.748 0-34-15.252-34-34V176h448v270c0 18.748-15.252 34-34 34z" />
    </svg>
  );
};

export const CalendarIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('CalendarIcon')
)(Component);
