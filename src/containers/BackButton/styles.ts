/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { ArrowLeftIcon } from '@project/components/atoms/Icon/ArrowLeft';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    padding: ${gutter};

    & > ${ArrowLeftIcon} {
      width: 2rem;
      height: 2rem;
      fill: ${colors.slate800};
    }
  `
);
