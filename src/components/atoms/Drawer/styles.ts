/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { DrawerPosition } from './index';

export const styles = styleWithHelpers(
  ({ cond, has, ifElse }): SerializedStyles => css`
    background-color: ${colors.white};
    position: ${ifElse('sticky', true, 'sticky', 'fixed')};
    padding: ${has('padding', gutter)};
    z-index: 1;

    width: ${cond('position', {
      [DrawerPosition.TOP]: '100%',
      [DrawerPosition.RIGHT]: 'auto',
      [DrawerPosition.LEFT]: 'auto',
      default: '100%'
    })};

    height: ${cond('position', {
      [DrawerPosition.TOP]: 'auto',
      [DrawerPosition.RIGHT]: '100%',
      [DrawerPosition.LEFT]: '100%',
      default: 'auto'
    })};

    top: ${ifElse('position', DrawerPosition.BOTTOM, 'auto', 0)};
    right: ${ifElse('position', DrawerPosition.LEFT, 'auto', 0)};
    bottom: ${ifElse('position', DrawerPosition.TOP, 'auto', 0)};
    left: ${ifElse('position', DrawerPosition.RIGHT, 'auto', 0)};
  `
);
