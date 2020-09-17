/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { lighten, darken } from 'polished';
import { colors, gutter, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    background-color: ${colors.blue};
    min-height: 20px;
  `
);

export const Anchor = styled('a')`
  display: block;
  padding: calc(${gutter} / 2) ${gutter};
  color: ${lighten(0.35, colors.blue)};
  cursor: pointer;

  &:hover {
    background-color: ${darken(0.05, colors.blue)};
  }

  &:active {
    background-color: ${darken(0.1, colors.blue)};
  }
`;
