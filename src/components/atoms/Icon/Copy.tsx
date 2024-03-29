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
      viewBox="0 0 210.107 210.107"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M168.506 0H80.235C67.413 0 56.981 10.432 56.981 23.254v2.854h-15.38c-12.822 0-23.254 10.432-23.254 23.254v137.492c0 12.822 10.432 23.254 23.254 23.254h88.271c12.822 0 23.253-10.432 23.253-23.254V184h15.38c12.822 0 23.254-10.432 23.254-23.254V23.254C191.76 10.432 181.328 0 168.506 0zm-30.38 186.854c0 4.551-3.703 8.254-8.253 8.254H41.601c-4.551 0-8.254-3.703-8.254-8.254V49.361c0-4.551 3.703-8.254 8.254-8.254h88.271c4.551 0 8.253 3.703 8.253 8.254v137.493zm38.634-26.108c0 4.551-3.703 8.254-8.254 8.254h-15.38V49.361c0-12.822-10.432-23.254-23.253-23.254H71.981v-2.854c0-4.551 3.703-8.254 8.254-8.254h88.271c4.551 0 8.254 3.703 8.254 8.254v137.493z" />
    </svg>
  );
};

export const CopyIcon = compose(
  withStyle(iconBase),
  withDisplayName('CopyIcon')
)(Component);
