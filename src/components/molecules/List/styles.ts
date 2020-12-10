/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, gutter, styleWithHelpers } from '@project/theme';

export const listStyle = styleWithHelpers(
  ({ has }): SerializedStyles => css`
    display: inline-flex;
    align-items: ${has('inline', 'center')};
  `
);

export const listItemStyle = styleWithHelpers(
  ({ has, ifElse }): SerializedStyles => css`
    border-bottom: ${has('underline', `2px solid ${colors.slate100}`)};
    padding: 0 0 ${ifElse('dropMargin', true, 0, gutter)} 0;
  `
);
