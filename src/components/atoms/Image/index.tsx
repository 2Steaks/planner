/** @format */

import React, { FunctionComponent } from 'react';
import { compose } from 'ramda';
import {
  withDisplayName,
  withLogging,
  withMappedProps,
  withStyle
} from '@project/helpers';
import { styles } from './styles';

export interface ImageProps {
  alt?: string;
  className?: string;
  src?: string;
}

const Component: FunctionComponent<ImageProps> = (props: ImageProps) => {
  return <img {...props} />;
};

const computed = (props: ImageProps) => {
  return {
    ...props,
    src: props.src || '/img/food.jpg'
  };
};

export const Image = compose(
  withStyle(compose(styles, computed)),
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('Image')
)(Component);
