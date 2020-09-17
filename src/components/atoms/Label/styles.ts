/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { gutter, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  ({ ifElse, not }): SerializedStyles => css`
    display: ${ifElse('inline', true, 'display-inline', 'block')};
    margin-bottom: ${not('inline', gutter)};
  `
);
