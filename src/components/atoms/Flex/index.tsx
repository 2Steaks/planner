/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { flexColumnStyle, flexStyle } from './styles';

export enum FlexDirection {
  COLUMN = 'column',
  ROW = 'row'
}

export enum FlexWrap {
  WRAP = 'wrap'
}

export enum FlexJustifyContent {
  FLEX_END = 'flex-end',
  SPACE_BETWEEN = 'space-between'
}

export enum FlexAlignItems {
  CENTER = 'center'
}

export interface FlexProps {
  children: ReactNode | ReactNode[] | JSX.Element;
  className?: string;
  spacing?: number;
  tag?: keyof JSX.IntrinsicElements;
}

export interface FlexColumnProps {
  children: ReactNode | ReactNode[];
  className?: string;
  grow?: number;
  shrink?: number;
  tag?: keyof JSX.IntrinsicElements;
  width?: string | number;
}

export interface FlexComposition {
  Column: FunctionComponent<FlexColumnProps>;
}

/**
 *
 * @param param0
 */
const Container: FunctionComponent<FlexProps> = ({
  children,
  tag: Tag = 'div',
  ...props
}: FlexProps) => {
  return <Tag {...props}>{children}</Tag>;
};

/**
 *
 * @param param0
 */
const Column: FunctionComponent<FlexColumnProps> = ({
  children,
  tag: Tag = 'div',
  ...props
}: FlexColumnProps) => {
  return <Tag {...props}>{children}</Tag>;
};

export const Flex = compose(
  withStyle(flexStyle, ['tag']),
  withDisplayName('Flex')
)(Container);

export const FlexColumn = compose(
  withStyle(flexColumnStyle, ['tag']),
  withLogging(false),
  withDisplayName('FlexColumn')
)(Column);
