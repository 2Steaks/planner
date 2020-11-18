/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, inputBaseStyle, styleWithHelpers } from '@project/theme';
import { Label } from '@project/components/atoms/Label';

export const styles = styleWithHelpers(
  ({ get, has }): SerializedStyles => css`
    ${Label} {
      text-align: left;
    }

    textarea {
      ${inputBaseStyle({ readOnly: get('readOnly') })}
      resize: none;
      display: block;
      box-sizing: border-box;
      overflow: hidden;
      color: ${colors.slate900};
      width: 100%;
      border-color: ${has('hasError', colors.red)};
      opacity: ${has('disabled', 0.5)};
      cursor: ${has('disabled', 'not-allowed')};
    }
  `
);
