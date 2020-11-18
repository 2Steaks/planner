/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { ListItem, ListVariant } from './index';

export const listStyle = styleWithHelpers(
  ({ when }): SerializedStyles => css`
    ${ListItem} {
      border-bottom: ${when(
        'variant',
        ListVariant.UNDERLINE,
        `2px solid ${colors.slate100}`
      )};
    }
  `
);

export const listItemStyle = styleWithHelpers(
  (): SerializedStyles => css`
    padding: calc(${gutter} / 2);
  `
);
