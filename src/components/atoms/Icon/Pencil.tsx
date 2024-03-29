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
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M51.2 353.28L0 512l158.72-51.2zM87.16 316.492L336.96 66.69l108.61 108.61L195.77 425.102zM504.32 79.36L432.64 7.68c-10.24-10.24-25.6-10.24-35.84 0l-23.04 23.04 107.52 107.52 23.04-23.04c10.24-10.24 10.24-25.6 0-35.84z" />
    </svg>
  );
};

export const PencilIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('PencilIcon')
)(Component);
