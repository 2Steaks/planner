/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, styleWithHelpers } from '@project/theme';
import { PaperVariant } from './index';

export const styles = styleWithHelpers(
  ({ cond, has, unless }): SerializedStyles => css`
    box-shadow: ${unless('shadow', false, `1px 1px 5px ${colors.slate300}`)};

    background-color: ${cond('variant', {
      [PaperVariant.DARK]: colors.slate900,
      default: colors.white
    })};

    color: ${cond('variant', {
      [PaperVariant.DARK]: colors.slate200,
      default: colors.slate900
    })};

    border: ${has(
      'border',
      cond('variant', {
        [PaperVariant.DARK]: `2px solid ${colors.slate900}`,
        default: `2px solid ${colors.slate300}`
      })
    )};
  `
);
