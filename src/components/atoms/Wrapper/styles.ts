/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { gutter, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  ({ get, has }): SerializedStyles => css`
    margin-bottom: ${has('spacing', `calc(${gutter} * ${get('spacing')})`)};
    max-width: ${get('constraint') || 'none'};
    margin-right: ${has('centered', 'auto')};
    margin-left: ${has('centered', 'auto')};
    padding: ${has('padding', gutter)};
  `
);
