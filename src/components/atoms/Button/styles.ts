/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { darken } from 'polished';
import { colors, styleWithHelpers } from '@project/theme';
import { ButtonVariant } from './index';

export const styles = styleWithHelpers(
  ({ cond, has, ifElse, unless }): SerializedStyles => css`
    border-radius: ${unless('variant', ButtonVariant.NONE, '5px')};
    padding: ${unless('variant', ButtonVariant.NONE, '0.7rem 1.2rem')};
    opacity: ${has('disabled', 0.5)};
    cursor: ${ifElse('disabled', true, 'not-allowed', 'pointer')};

    color: ${cond('variant', {
      [ButtonVariant.INFO]: colors.white,
      [ButtonVariant.WARNING]: colors.white,
      default: colors.slate900
    })};

    border: ${cond('variant', {
      [ButtonVariant.NONE]: 'none',
      [ButtonVariant.INFO]: `2px solid ${darken(0.2, colors.blue)}`,
      [ButtonVariant.WARNING]: `2px solid ${darken(0.2, colors.red)}`,
      default: `2px solid ${colors.slate300}`
    })};

    background-color: ${cond('variant', {
      [ButtonVariant.NONE]: 'transparent',
      [ButtonVariant.INFO]: colors.blue,
      [ButtonVariant.WARNING]: colors.red,
      default: colors.slate100
    })};

    &:hover {
      background-color: ${cond('variant', {
        [ButtonVariant.NONE]: 'transparent',
        [ButtonVariant.INFO]: darken(0.1, colors.blue),
        [ButtonVariant.WARNING]: darken(0.1, colors.red),
        default: colors.slate200
      })};
    }

    &:active {
      outline: none;

      color: ${cond('variant', {
        [ButtonVariant.INFO]: colors.white,
        [ButtonVariant.WARNING]: colors.white,
        default: colors.slate900
      })};

      background-color: ${cond('variant', {
        [ButtonVariant.NONE]: 'transparent',
        [ButtonVariant.INFO]: darken(0.2, colors.blue),
        [ButtonVariant.WARNING]: darken(0.2, colors.red),
        default: colors.slate400
      })};
    }

    &:focus {
      outline: none;
    }
  `
);
