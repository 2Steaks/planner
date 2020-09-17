/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { colors, gutter, objectFit, styleWithHelpers } from '@project/theme';
import { AvatarIcon, Image, MealPlanIcon } from '@project/components/atoms';

export const Span = styled('span')`
  font-size: 3rem;
  vertical-align: middle;
  color: ${colors.slate900};
`;

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    background-color: ${colors.beige};

    ${AvatarIcon},
    ${MealPlanIcon} {
      width: 4rem;
      height: 4rem;
      margin-right: ${gutter};
      vertical-align: middle;
    }

    ${Image} {
      ${objectFit()};
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
    }
  `
);
