/** @format */

import { css, SerializedStyles } from '@emotion/core';
import media from 'css-in-js-media';
import { gutter, styleWithHelpers } from '@project/theme';

export const containerStyle = (): SerializedStyles => css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;

  ${media('<tablet')} {
    grid-gap: ${gutter};
  }

  ${media('>tablet')} {
    grid-gap: calc(${gutter} * 2);
  }
`;

export const columnStyle = styleWithHelpers(
  ({ get, has }): SerializedStyles => css`
    ${media('>smallPhone')} {
      ${has('xs', `grid-column: span ${get('xs')}`)};
    }

    ${media('>phone')} {
      ${has('sm', `grid-column: span ${get('sm')}`)};
    }

    ${media('>tablet')} {
      ${has('md', `grid-column: span ${get('md')}`)};
    }

    ${media('>desktop')} {
      ${has('lg', `grid-column: span ${get('lg')}`)};
    }

    ${media('>largeDesktop')} {
      ${has('xl', `grid-column: span ${get('xl')}`)};
    }
  `
);
