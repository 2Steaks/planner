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
      <path d="M503.401 228.884l-43.253-39.411V58.79c0-8.315-6.741-15.057-15.057-15.057H340.976c-8.315 0-15.057 6.741-15.057 15.057v8.374l-52.236-47.597c-10.083-9.189-25.288-9.188-35.367-.001L8.598 228.885c-8.076 7.36-10.745 18.7-6.799 28.889 3.947 10.189 13.557 16.772 24.484 16.772h36.689v209.721c0 8.315 6.741 15.057 15.057 15.057h125.913c8.315 0 15.057-6.741 15.057-15.057V356.931H293v127.337c0 8.315 6.741 15.057 15.057 15.057h125.908c8.315 0 15.057-6.741 15.056-15.057V274.547h36.697c10.926 0 20.537-6.584 24.484-16.772 3.945-10.19 1.277-21.53-6.801-28.891zm-69.436 15.549c-8.315 0-15.057 6.741-15.057 15.057v209.721h-95.793V341.874c0-8.315-6.742-15.057-15.057-15.057H203.942c-8.315 0-15.057 6.741-15.057 15.057v127.337h-95.8V259.49c0-8.315-6.741-15.057-15.057-15.057H36.245l219.756-200.24 74.836 68.191a15.061 15.061 0 0016.224 2.644 15.06 15.06 0 008.973-13.774V73.847h74.002v122.276c0 4.237 1.784 8.276 4.916 11.13l40.803 37.18h-41.79z" />
    </svg>
  );
};

export const HomeIcon = compose(
  withStyle(iconBase),
  withLogging(false),
  withDisplayName('HomeIcon')
)(Component);
