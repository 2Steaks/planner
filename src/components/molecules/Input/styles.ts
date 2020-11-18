/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, inputBaseStyle, styleWithHelpers } from '@project/theme';
import { Label } from '@project/components/atoms/Label';
import { InputVariant } from './index';

export const styles = styleWithHelpers(
  ({ get, has, nest, unless }): SerializedStyles => css`
    ${Label} {
      text-align: left;
    }

    input {
      ${nest(unless('variant', InputVariant.NONE))} {
        ${inputBaseStyle({ readOnly: get('readOnly') })}
        border-color: ${has('hasError', colors.red)};
      }

      opacity: ${has('disabled', 0.5)};
      cursor: ${has('disabled', 'not-allowed')};
    }
  `
);
