/** @format */

import React, { FunctionComponent } from 'react';
import { compose } from 'ramda';
import { IconProps } from '@project/types';
import { withDisplayName, withStyle } from '@project/helpers';
import { iconBase } from '@project/theme';

const Component: FunctionComponent<IconProps> = ({
  className,
  ...props
}: IconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 404.375 404.375"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M108.669 404.375c-4.18 0-7.837-1.567-10.971-4.702-6.269-6.269-6.269-16.196 0-21.943l176.065-175.543L97.698 26.645c-6.269-6.269-6.269-16.196 0-21.943 6.269-6.269 16.196-6.269 21.943 0l187.037 186.514c3.135 3.135 4.702 6.792 4.702 10.971 0 4.18-1.567 8.359-4.702 10.971L119.641 399.673c-3.135 3.135-6.792 4.702-10.972 4.702z" />
    </svg>
  );
};

export const ArrowRightIcon = compose(
  withStyle(iconBase),
  withDisplayName('ArrowRightIcon')
)(Component);
