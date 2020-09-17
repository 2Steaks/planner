/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { gutter, styleWithHelpers } from '@project/theme';
import { HeadingSize } from './index';

const base: SerializedStyles = css`
  margin: 0 0 ${gutter};
  text-decoration: none;
`;

export const styles = styleWithHelpers(
  ({ cond }): SerializedStyles => css`
    ${base};

    font-size: ${cond('size', {
      [HeadingSize.SUPER]: '5rem',
      [HeadingSize.H1]: '3rem',
      [HeadingSize.H2]: '2.8rem',
      [HeadingSize.H3]: '2.6rem',
      [HeadingSize.H4]: '2.4rem',
      [HeadingSize.H5]: '2.2rem',
      [HeadingSize.H6]: '2rem',
      default: '3rem'
    })};
  `
);
