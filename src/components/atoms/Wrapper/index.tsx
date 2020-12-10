/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose, omit } from 'ramda';
import { Breakpoints } from '@project/types';
import {
  withDisplayName,
  withLogging,
  withMappedProps,
  withStyle
} from '@project/helpers';
import { styles } from './styles';

export enum WrapperSpacing {
  NONE = 0,
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3
}

export interface WrapperProps {
  centered?: boolean;
  children: ReactNode | ReactNode[];
  className?: string;
  constraint?: Breakpoints;
  padding?: boolean;
  spacing?: WrapperSpacing;
  tag?: keyof JSX.IntrinsicElements;
}

const Component: FunctionComponent<WrapperProps> = ({
  children,
  tag: Tag = 'div',
  ...props
}: WrapperProps) => {
  return <Tag {...props}>{children}</Tag>;
};

const computed = (props: WrapperProps) => ({
  ...props,
  tag: props.tag || 'div'
});

export const Wrapper = compose(
  withStyle(compose(styles, computed), ['tag']),
  withLogging(false),
  withMappedProps(compose(omit(['spacing']), computed)),
  withDisplayName('Wrapper')
)(Component);
