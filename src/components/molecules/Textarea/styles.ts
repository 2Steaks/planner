/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import {
  colors,
  gutter,
  inputBaseStyle,
  styleWithHelpers
} from '@project/theme';
import { Label } from '@project/components/atoms/Label';

const gridArea = css`
  grid-area: 1 / 1 / 2 / 2;
`;

export const Clone = styled('div')`
  display: grid;

  &:after {
    ${gridArea};
    content: attr(data-value) ' ';
    white-space: pre-wrap;
    visibility: hidden;
    padding: ${gutter} 0;
  }
`;

export const styles = styleWithHelpers(
  ({ get, has }): SerializedStyles => css`
    ${Label} {
      text-align: left;
    }

    textarea {
      ${gridArea};
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
