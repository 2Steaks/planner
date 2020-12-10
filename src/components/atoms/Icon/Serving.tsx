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
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M467 439H45c-24.813 0-45-20.187-45-45v-4c0-24.813 20.187-45 45-45h422c24.813 0 45 20.187 45 45v4c0 24.813-20.187 45-45 45zM45 375c-8.271 0-15 6.729-15 15v4c0 8.271 6.729 15 15 15h422c8.271 0 15-6.729 15-15v-4c0-8.271-6.729-15-15-15zM320 103H192c-8.284 0-15-6.716-15-15s6.716-15 15-15h128c8.284 0 15 6.716 15 15s-6.716 15-15 15z" />
      <path d="M288 167h-64c-8.284 0-15-6.716-15-15V88c0-8.284 6.716-15 15-15h64c8.284 0 15 6.716 15 15v64c0 8.284-6.716 15-15 15zm-49-30h34v-34h-34z" />
      <path d="M464 375H48c-8.284 0-15-6.716-15-15 0-59.565 23.196-115.565 65.315-157.685S196.435 137 256 137s115.565 23.196 157.685 65.315S479 300.435 479 360c0 8.284-6.716 15-15 15zM63.577 345h384.846c-7.68-99.438-91.049-178-192.423-178S71.256 245.562 63.577 345z" />
    </svg>
  );
};

export const ServingIcon = compose(
  withStyle(iconBase),
  withDisplayName('ServingIcon')
)(Component);
