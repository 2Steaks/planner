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
      <circle cx="256" cy="452" r="60" />
      <path d="M256 0c-86.019 0-156 69.981-156 156v15h120v-15c0-19.851 16.149-36 36-36s36 16.149 36 36c0 10.578-4.643 20.59-12.74 27.471L196 254.258V362h120v-52.258l40.976-34.837C391.944 245.191 412 201.853 412 156 412 69.981 342.019 0 256 0z" />
    </svg>
  );
};

export const QuestionMarkIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('QuestionMarkIcon')
)(Component);
