/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { gutter, styleWithHelpers } from '@project/theme';
import { BellIcon } from '@project/components/atoms/Icon/Bell';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    ${BellIcon} {
      width: 2rem;
      height: 2rem;
      position: relative;
      top: 0.2rem;
    }

    & > i {
      display: block;
      padding-top: ${gutter};
      font-size: 1.2rem;
    }
  `
);
