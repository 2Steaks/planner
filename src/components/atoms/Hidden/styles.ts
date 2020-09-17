/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  ({ not }): SerializedStyles => css`
    display: ${not('condition', 'none')};
  `
);
