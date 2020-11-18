/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, inputBaseStyle, styleWithHelpers } from '@project/theme';
import { Label } from '@project/components/atoms/Label';

export const styles = styleWithHelpers(
  ({ get, has }): SerializedStyles => css`
    ${Label} {
      text-align: left;
    }

    input {
      ${inputBaseStyle({ readOnly: get('readOnly') })}
      opacity: ${has('disabled', 0.5)};
      cursor: ${has('disabled', 'not-allowed')};
      border-color: ${has('hasError', colors.red)};
    }
  `
);
