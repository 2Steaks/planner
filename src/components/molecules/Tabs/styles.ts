/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, styleWithHelpers } from '@project/theme';
import { ListItem } from '@project/components/molecules/List';

export const containerStyles = styleWithHelpers(
  ({ get }): SerializedStyles => css`
    ${ListItem} {
      cursor: pointer;

      &:nth-child(${get('value') + 1}) {
        color: ${colors.blue};
      }
    }
  `
);

export const itemStyles = styleWithHelpers((): SerializedStyles => css``);
