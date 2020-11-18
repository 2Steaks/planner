/** @format */

import { SerializedStyles, css } from '@emotion/core';
import { objectFit, styleWithHelpers } from '@project/theme';
import { Image } from '@project/components';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    ${Image} {
      ${objectFit()};
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
      max-width: none;
    }
  `
);
