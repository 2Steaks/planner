/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { gutter, styleWithHelpers } from '@project/theme';

export const Circle = styled('span')(
  styleWithHelpers(
    ({ get }): SerializedStyles => css`
      color: white;
      display: inline-block;
      padding: calc(${gutter} / 2);
      background-color: ${get('color')};
      border-radius: 50%;

      & > * {
        display: block;
      }
    `
  )
);
