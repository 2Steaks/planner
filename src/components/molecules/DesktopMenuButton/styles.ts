/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { Button } from '@project/components/atoms/Button';
import { Hidden } from '@project/components/atoms/Hidden';
import { Menu } from '@project/components/atoms/Menu';
import { MenuIcon } from '@project/components/atoms/Icon/Menu';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    position: relative;
    display: initial;

    & > ${Button} {
      padding: ${gutter};
    }

    ${MenuIcon} {
      width: 2rem;
      height: 2rem;
      fill: ${colors.slate800};
    }

    ${Hidden} {
      z-index: 999;
    }

    ${Menu} {
      min-width: 100px;
      padding: ${gutter};
      white-space: nowrap;
    }
  `
);

export const menuAnimConfig = {
  config: {
    duration: 50
  },
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 }
};
