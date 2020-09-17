/** @format */

import { css } from '@emotion/core';

export const gutter = '1rem';

export const absoluteFill = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const breakPrivateLayout = css`
  position: relative;
  right: 50%;
  left: 50%;
  margin-right: -50vw;
  margin-left: -50vw;
  width: 100vw;
`;
