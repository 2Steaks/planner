/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { lighten, darken } from 'polished';
import { StyledComponentWithExtra } from '@project/types';
import { colors, gutter, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    background-color: ${colors.blue};
    min-height: 20px;
  `
);

export const Anchor: StyledComponentWithExtra<{ isActive: boolean }> = styled(
  'a'
)(
  styleWithHelpers(
    ({ ifElse }): SerializedStyles => css`
      display: block;
      padding: calc(${gutter} / 2) ${gutter};
      color: ${lighten(0.35, colors.blue)};
      cursor: pointer;
      background-color: ${ifElse(
        'isActive',
        true,
        darken(0.1, colors.blue),
        colors.blue
      )};

      &:hover {
        background-color: ${darken(0.05, colors.blue)};
      }

      &:active {
        background-color: ${darken(0.1, colors.blue)};
      }
    `
  )
);
