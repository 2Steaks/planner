/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { inputBaseStyle, styleWithHelpers } from '@project/theme';

export const styles = styleWithHelpers(
  ({ get, has }): SerializedStyles => css`
  ${inputBaseStyle({ readOnly: get('readOnly') })}
  opacity: ${has('disabled', 0.5)};
  cursor: ${has('disabled', 'not-allowed')};
`
);
