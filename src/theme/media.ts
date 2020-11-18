/** @format */

import { css, SerializedStyles } from '@emotion/core';

export const objectFit = (
  fit = 'cover',
  position = 'center'
): SerializedStyles => css`
  object-fit: ${fit};
  object-position: ${position};
`;
