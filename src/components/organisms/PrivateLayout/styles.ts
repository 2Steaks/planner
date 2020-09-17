/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { gutter } from '@project/theme';
import { Drawer } from '@project/components/atoms/Drawer';

export const styles = (): SerializedStyles => css`
  padding-bottom: 50px;

  & > ${Drawer} {
    z-index: 900;
    border: none;
  }

  main {
    padding: calc(${gutter} * 3) ${gutter} ${gutter} ${gutter};
  }
`;
