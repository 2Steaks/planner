/** @format */

import { css } from '@emotion/core';
import { colors } from './palette';
import { gutter } from './layout';

const inputReset = css`
  padding: inherit;
  background-color: inherit;
  border: inherit;
  border-radius: inherit;
  height: auto;
`;

const inputBase = css`
  padding: ${gutter};
  background-color: ${colors.white};
  border: 1px solid ${colors.slate300};
  border-radius: 5px;
  width: 100%;
`;

export const inputBaseStyle = ({ readOnly }: { readOnly?: boolean }) => css`
  ${readOnly ? inputReset : inputBase};
`;

export const input = inputBaseStyle;
