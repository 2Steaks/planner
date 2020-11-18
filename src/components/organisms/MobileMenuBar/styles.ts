/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    border-top: 2px solid ${colors.slate100};
  `
);
