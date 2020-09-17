/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, gutter } from '@project/theme';
import { MealPlanIcon } from '@project/components/atoms/Icon';
import { Heading } from '@project/components/atoms/Heading';

export const styles = (): SerializedStyles => css`
  text-align: center;

  header {
    padding: calc(${gutter} * 2);
    background-color: ${colors.beige};
  }

  ${Heading} {
    margin: 0;
  }

  ${MealPlanIcon} {
    width: 8rem;
    height: 8rem;
  }
`;
