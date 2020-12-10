/** @format */

import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { styleWithHelpers } from '@project/theme';

export const Breakout = styled('div')(
  styleWithHelpers(
    ({ nest, unless }): SerializedStyles => css`
      ${nest(unless('isDisabled'))} {
        position: relative;
        right: 50%;
        left: 50%;
        margin-right: -50vw;
        margin-left: -50vw;
        width: 100vw;
      }
    `
  )
);
