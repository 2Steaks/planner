/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { gutter, styleWithHelpers } from '@project/theme';
import { FlexColumn } from './index';

export const flexStyle = styleWithHelpers(
  ({ get }): SerializedStyles => css`
    display: flex;
    margin: 0 ${get('spacing') ?? `calc(-${gutter} / 2)`};
    align-items: ${get('alignItems')};
    justify-content: ${get('justifyContent')};
    flex-wrap: ${get('wrap')};

    ${FlexColumn} {
      padding: 0 ${get('spacing') ?? `calc(${gutter} / 2)`};
    }
  `
);

export const flexColumnStyle = styleWithHelpers(
  ({ get }): SerializedStyles => css`
    flex: ${get('grow') || 0} ${get('shrink') || 0} ${get('width') || 'auto'};
  `
);
