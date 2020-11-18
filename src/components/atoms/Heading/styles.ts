/** @format */

import { css, SerializedStyles } from '@emotion/core';
import media from 'css-in-js-media';
import { gutter, styleWithHelpers } from '@project/theme';
import { HeadingSize } from './index';

const base: SerializedStyles = css`
  margin: 0 0 ${gutter};
  text-decoration: none;
`;

export const styles = styleWithHelpers(
  ({ cond }): SerializedStyles => css`
    ${base};

    ${media('<tablet')} {
      font-size: ${cond('size', {
        [HeadingSize.SUPER]: '4rem',
        [HeadingSize.H1]: '3rem',
        [HeadingSize.H2]: '2.6rem',
        [HeadingSize.H3]: '2.3rem',
        [HeadingSize.H4]: '2rem',
        [HeadingSize.H5]: '1.7rem',
        [HeadingSize.H6]: '1.4rem',
        default: '1.4rem'
      })};
    }

    ${media('>tablet')} {
      font-size: ${cond('size', {
        [HeadingSize.SUPER]: '5rem',
        [HeadingSize.H1]: '4rem',
        [HeadingSize.H2]: '3rem',
        [HeadingSize.H3]: '2.6rem',
        [HeadingSize.H4]: '2.2rem',
        [HeadingSize.H5]: '1.8rem',
        [HeadingSize.H6]: '1.4rem',
        default: '1.4rem'
      })};
    }
  `
);
