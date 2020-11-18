/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { gutter, styleWithHelpers } from '@project/theme';

export const flexStyle = styleWithHelpers(
  ({ get }): SerializedStyles => css`
    display: flex;
    align-items: ${get('alignItems')};
    justify-content: ${get('justifyContent')};
    flex-direction: ${get('direction')};
    flex-wrap: ${get('wrap')};
    gap: ${get('spacing') ?? gutter};
  `
);

export const flexColumnStyle = styleWithHelpers(
  ({ get }): SerializedStyles => css`
    flex-grow: ${get('grow')};
    flex-shrink: ${get('shrink')};
    flex-basis: ${get('width')};
    order: ${get('order')};
  `
);
