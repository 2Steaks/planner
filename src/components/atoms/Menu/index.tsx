/** @format */
import React, { FunctionComponent, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { compose } from 'ramda';
import { withDisplayName, withRef, withStyle } from '@project/helpers';
import { colors } from '@project/theme';

export interface MenuProps {
  children: ReactNode;
  forwardRef: any;
  tag?: keyof JSX.IntrinsicElements | any;
}

const Component: FunctionComponent<MenuProps> = ({
  children,
  forwardRef,
  tag: Tag = 'div',
  ...props
}: MenuProps) => {
  return (
    <Tag ref={forwardRef} {...props}>
      {children}
    </Tag>
  );
};

const style = (): SerializedStyles => css`
  background-color: white;
  border-radius: 5px;
  border: 1px solid ${colors.slate100};
  z-index: 999;
  box-shadow: 1px 1px 3px ${colors.slate100};
  overflow: auto;
  max-height: 200px;
  width: 100%;
  min-width: 100px;
`;

export const Menu = compose(
  withStyle(style, ['tag']),
  withRef,
  withDisplayName('Menu')
)(Component);
