/** @format */

import { css, SerializedStyles } from '@emotion/core';
import media from 'css-in-js-media';
import { gutter, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  ({ get, has }): SerializedStyles => css`
    max-width: 100%;
    margin-bottom: ${has('spacing', `calc(${gutter} * ${get('spacing')})`)};
    margin-right: ${has('centered', 'auto')};
    margin-left: ${has('centered', 'auto')};
    padding: ${has('padding', gutter)};

    ${media('<phone')} {
      width: 100%;
    }

    ${media('>phone')} {
      width: ${get('constraint') || 'auto'};
    }
  `
);
