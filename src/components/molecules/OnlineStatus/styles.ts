/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, gutter, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    color: ${colors.white};
    background-color: ${colors.red};
    padding: calc(${gutter} / 2);
    width: 100%;
    text-align: center;
    font-size: 1rem;
    text-transform: uppercase;
  `
);
