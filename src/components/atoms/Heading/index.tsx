/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import {
  withDisplayName,
  withLogging,
  withMappedProps,
  withStyle
} from '@project/helpers';
import { styles } from './styles';

export enum HeadingSize {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
  SUPER = 'SUPER'
}

export enum HeadingTag {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6'
}

export interface HeadingProps {
  children: ReactNode | ReactNode[];
  className?: string;
  size?: HeadingSize;
  tag: HeadingTag;
}

const Component: FunctionComponent<HeadingProps> = ({
  children,
  tag: Tag,
  ...props
}: HeadingProps) => {
  return <Tag {...props}>{children}</Tag>;
};

const computed = (props: HeadingProps) => {
  const tag = props.tag ? props.tag : HeadingTag.H1;

  return {
    ...props,
    size: props.size || HeadingSize[tag.toUpperCase()],
    tag
  };
};

export const Heading = compose(
  withStyle(compose(styles, computed)),
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('Heading')
)(Component);
