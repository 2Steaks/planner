/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  ({ unless }): SerializedStyles => css`
    visibility: ${unless('unless', true, 'hidden')};
  `
);
