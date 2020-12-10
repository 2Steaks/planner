/** @format */

import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { StyledComponentWithProps } from '@project/types';
import {
  CalendarIcon,
  HistoryIcon,
  HomeIcon,
  RecipeIcon
} from '@project/components/atoms/Icon';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    text-align: center;
    padding: ${gutter} 0;
  `
);

export const Anchor: StyledComponentWithProps<{ isActive: boolean }> = styled(
  'a'
)(
  styleWithHelpers(
    ({ ifElse }): SerializedStyles => css`
      ${CalendarIcon},
      ${HistoryIcon},
      ${HomeIcon},
      ${RecipeIcon} {
        fill: ${ifElse('isActive', true, colors.blue, colors.slate500)};
        width: 2.5rem;
        height: 2.5rem;
      }
    `
  )
);
