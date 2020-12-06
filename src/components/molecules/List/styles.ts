/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, styleWithHelpers } from '@project/theme';
import { ListItem, ListVariant } from './index';

export const listStyle = styleWithHelpers(
  ({ has, when }): SerializedStyles => css`
    display: inline-flex;
    align-items: ${has('inline', 'center')};

    ${ListItem} {
      border-bottom: ${when(
        'variant',
        ListVariant.UNDERLINE,
        `2px solid ${colors.slate100}`
      )};
    }
  `
);

export const listItemStyle = styleWithHelpers((): SerializedStyles => css``);
