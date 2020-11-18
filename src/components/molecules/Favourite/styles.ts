/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { Button } from '@project/components/atoms/Button';
import { HeartIcon } from '@project/components/atoms/Icon/Heart';

export const styles = styleWithHelpers((): SerializedStyles => css``);

export const FavouriteHeart = styled(HeartIcon)(
  styleWithHelpers(
    ({ ifElse }): SerializedStyles => css`
      width: 3rem;
      height: 3rem;
      fill: ${ifElse('isActive', true, colors.red, 'transparent')};
      stroke: white;
      stroke-width: 3rem;
    `
  )
);

export const FavouriteButton = styled(Button)`
  position: absolute;
  bottom: ${gutter};
  right: calc(${gutter} + (${gutter} / 2));
`;
