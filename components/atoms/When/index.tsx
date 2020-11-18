/** @format */

import React, { FunctionComponent, Fragment, ReactNode } from 'react';

export interface WhenProps {
  children: ReactNode | ReactNode[];
  condition: boolean;
}

export const When: FunctionComponent<WhenProps> = ({
  children,
  condition
}: WhenProps) => {
  return <Fragment>{condition ? children : null}</Fragment>;
};
