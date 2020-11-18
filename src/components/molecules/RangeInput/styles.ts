/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { darken } from 'polished';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';
import { colors, styleWithHelpers } from '@project/theme';

export const Value: StyledComponentWithExtra<ChildrenType> = styled('div')`
  text-align: center;
`;

export const styles = styleWithHelpers(
  ({ has, ifElse }): SerializedStyles => css`
    input[type='range'] {
      appearance: none;
      width: 100%;
      background: transparent;
      border: none;
      margin-bottom: 1rem;
      opacity: ${has('disabled', 0.5)};

      &:focus {
        outline: none;
      }

      &::-webkit-slider-thumb {
        appearance: none;
        height: 1.8rem;
        width: 1.8rem;
        border-radius: 50%;
        background: ${colors.blue};
        cursor: ${ifElse('disabled', true, 'not-allowed', 'grab')};
        margin-top: -0.8rem;
        box-shadow: 1px 1px 2px ${darken(0.3, colors.blue)},
          0px 0px 2px ${darken(0.2, colors.blue)};
      }

      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 0.3rem;
        cursor: ${ifElse('disabled', true, 'not-allowed', 'grab')};
        background: ${colors.slate200};
        border-radius: 1.3px;
      }
    }
  `
);
