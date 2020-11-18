/** @format */

import React, { FunctionComponent } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { ButtonVariant } from '@project/components/atoms/Button';
import { FavouriteButton, FavouriteHeart, styles } from './styles';

export interface FavouriteProps {
  className: string;
  isActive?: boolean;
  onClick: () => void;
}

const Component: FunctionComponent<FavouriteProps> = ({
  isActive,
  className,
  onClick
}: FavouriteProps) => {
  return (
    <FavouriteButton
      className={className}
      onClick={onClick}
      variant={ButtonVariant.NONE}
    >
      <FavouriteHeart isActive={isActive} />
    </FavouriteButton>
  );
};

export const Favourite = compose(
  withStyle(styles, ['isActive']),
  withDisplayName('Favourite')
)(Component);
