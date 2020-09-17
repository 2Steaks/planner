/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { columnStyle, containerStyle } from './styles';

export interface GridProps {
  children: ReactNode | ReactNode[] | JSX.Element;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export interface GridColumnProps {
  children: ReactNode | ReactNode[];
  className?: string;
  span: number;
  tag?: keyof JSX.IntrinsicElements;
}

export interface GridComposition {
  Column: FunctionComponent<GridColumnProps>;
}

/**
 *
 * @param param0
 */
const Container: FunctionComponent<GridProps> = ({
  children,
  tag: Tag = 'div',
  ...props
}: GridProps) => {
  return <Tag {...props}>{children}</Tag>;
};

/**
 *
 * @param param0
 */
const Column: FunctionComponent<GridColumnProps> = ({
  children,
  tag: Tag = 'div',
  ...props
}: GridColumnProps) => {
  return <Tag {...props}>{children}</Tag>;
};

export const Grid = compose(
  withStyle(containerStyle, ['tag']),
  withLogging(false),
  withDisplayName('Grid')
)(Container);

export const GridColumn = compose(
  withStyle(columnStyle, ['tag']),
  withLogging(false),
  withDisplayName('GridColumn')
)(Column);
