/** @format */

import { css, SerializedStyles } from '@emotion/core';
import media from 'css-in-js-media';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { BackArrowIcon } from '@project/components/atoms/Icon/BackArrow';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    padding: ${gutter};

    & > ${BackArrowIcon} {
      fill: ${colors.slate800};

      ${media('<tablet')} {
        width: 2rem;
        height: 2rem;
      }

      ${media('>tablet')} {
        width: 3rem;
        height: 3rem;
      }
    }
  `
);
