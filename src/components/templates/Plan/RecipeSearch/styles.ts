/** @format */

import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { colors, styleWithHelpers } from '@project/theme';
import { Grid, RecipeArticle } from '@project/components';

export const PlanRecipeGrid = styled(Grid)`
  overflow: auto;
  height: 33vh;
`;

export const PlanRecipeArticle = styled(RecipeArticle)(
  styleWithHelpers(
    ({ has }): SerializedStyles => css`
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: ${has('isActive', `2px solid ${colors.green}`)};
        border-radius: 5px;
        z-index: 1;
      }
    `
  )
);
