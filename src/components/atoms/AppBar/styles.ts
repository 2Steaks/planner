/** @format */

import { css, SerializedStyles } from '@emotion/core';
import media from 'css-in-js-media';
import { colors, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  ({ has, nest }): SerializedStyles => css`
    ${media('<tablet')} {
      position: ${has('isSticky', 'sticky')};
      top: 0;
      background: white;
      box-shadow: ${has('isSticky', `1px 1px 3px ${colors.slate100}`)};
      z-index: 999;

      ${nest(has('isSticky'))} {
        right: 0;
        left: 0;
        margin-right: -50vw;
        margin-left: -50vw;
        width: 100vw;
      }
    }
  `
);
