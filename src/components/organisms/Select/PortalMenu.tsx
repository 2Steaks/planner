/** @format */
import React, { FunctionComponent, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { compose } from 'ramda';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { Menu } from '@project/components/atoms/Menu';
import { Portal } from '@project/components/atoms/Portal';

export interface MenuProps {
  children: ReactNode;
}

const Component: FunctionComponent<MenuProps> = ({
  children,
  ...props
}: MenuProps) => {
  return (
    <Portal>
      <Menu {...props}>{children}</Menu>
    </Portal>
  );
};

const style = (): SerializedStyles => css`
  position: fixed;
`;

export const PortalMenu = compose(
  withStyle(style),
  withLogging(false),
  withDisplayName('Option')
)(Component);
