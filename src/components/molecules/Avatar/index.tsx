/** @format */
import React, { FunctionComponent } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withMappedProps, withStyle } from '@project/helpers';
import { Image } from '@project/components';
import { styles } from './styles';

export interface AvatarProps {
  image: string;
}

export const Component: FunctionComponent<AvatarProps> = ({
  image = '/img/default-avatar.png',
  ...props
}: AvatarProps) => {
  return (
    <a {...props}>
      <Image src={image} />
    </a>
  );
};

const computed = (props: AvatarProps) => {
  const image = props.image || '/img/default-avatar.png';

  return {
    ...props,
    image
  };
};

export const Avatar = compose(
  withStyle(compose(styles, computed), ['image']),
  withMappedProps(computed),
  withDisplayName('Avatar')
)(Component);
