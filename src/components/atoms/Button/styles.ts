/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { darken } from 'polished';
import { colors, styleWithHelpers } from '@project/theme';
import { ButtonTheme } from './index';

export const styles = styleWithHelpers(
  ({ cond, has, ifElse, unless }): SerializedStyles => css`
    border-radius: ${unless('theme', ButtonTheme.NONE, '5px')};
    padding: ${unless('theme', ButtonTheme.NONE, '0.7rem 1.2rem')};
    opacity: ${has('disabled', 0.5)};
    cursor: ${ifElse('disabled', true, 'not-allowed', 'pointer')};

    color: ${cond('theme', {
      [ButtonTheme.WARNING]: colors.white,
      default: colors.slate900
    })};

    border: ${cond('theme', {
      [ButtonTheme.NONE]: 'none',
      [ButtonTheme.WARNING]: `2px solid ${darken(0.2, colors.red)}`,
      default: `2px solid ${colors.slate300}`
    })};

    background-color: ${cond('theme', {
      [ButtonTheme.NONE]: 'transparent',
      [ButtonTheme.WARNING]: colors.red,
      default: colors.slate100
    })};

    &:hover {
      background-color: ${cond('theme', {
        [ButtonTheme.NONE]: 'transparent',
        [ButtonTheme.WARNING]: darken(0.1, colors.red),
        default: colors.slate200
      })};
    }

    &:active {
      outline: none;

      color: ${cond('theme', {
        [ButtonTheme.WARNING]: colors.white,
        default: colors.slate900
      })};

      background-color: ${cond('theme', {
        [ButtonTheme.NONE]: 'transparent',
        [ButtonTheme.WARNING]: darken(0.2, colors.red),
        default: colors.slate400
      })};
    }
  `
);
