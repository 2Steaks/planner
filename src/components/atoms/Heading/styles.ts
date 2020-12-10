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
  ({ cond, get, has }): SerializedStyles => css`
    ${base};

    ${media('<tablet')} {
      font-size: ${cond('size', {
        [HeadingSize.SUPER]: '3.2rem',
        [HeadingSize.H1]: '2.6rem',
        [HeadingSize.H2]: '2.3rem',
        [HeadingSize.H3]: '2rem',
        [HeadingSize.H4]: '1.7rem',
        [HeadingSize.H5]: '1.4rem',
        [HeadingSize.H6]: '1.1rem',
        default: '1.1rem'
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

    margin-bottom: ${has('dropMargin', 0)};
    text-align: ${get('align')};
  `
);
