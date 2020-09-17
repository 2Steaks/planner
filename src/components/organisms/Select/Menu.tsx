/** @format */
import React, { FunctionComponent, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { compose } from 'ramda';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { colors } from '@project/theme';

export interface MenuProps {
  children: ReactNode;
}

const Component: FunctionComponent<MenuProps> = ({
  children,
  ...props
}: MenuProps) => {
  return <div {...props}>{children}</div>;
};

const style = (): SerializedStyles => css`
  background-color: white;
  border-radius: 5px;
  border: 1px solid ${colors.slate300};
  z-index: 999;
  box-shadow: 1px 1px 2px ${colors.slate300};
  overflow: auto;
  max-height: 200px;
  position: absolute;
  width: 100%;
  top: calc(100% + 5px);
  left: 0;
`;

export const Menu = compose(
  withStyle(style),
  withLogging(false),
  withDisplayName('Menu')
)(Component);
