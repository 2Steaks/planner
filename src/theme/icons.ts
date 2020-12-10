/** @format */

import { css } from '@emotion/core';

type IconBaseProps = { size?: number };
export const iconBase = ({ size }: IconBaseProps) => css`
  width: ${size ?? 1}rem;
  height: ${size ?? 1}rem;
  fill: currentColor;
  pointer-events: none;
`;
