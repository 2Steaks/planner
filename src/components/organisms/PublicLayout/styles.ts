/** @format */

import { css, SerializedStyles } from '@emotion/core';
import media from 'css-in-js-media';
import { gutter } from '@project/theme';
import { Drawer } from '@project/components/atoms/Drawer';
import { ProgressAPI } from '@project/containers/ProgressAPI';

export const styles = (): SerializedStyles => css`
  ${media('<tablet')} {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  & > ${Drawer} {
    z-index: 900;
  }

  & > ${ProgressAPI} {
    position: fixed;
    width: 100%;
    height: 3px;
    top: 0;
    left: 0;
  }

  main {
    ${media('<tablet')} {
      padding: ${gutter};
      flex: 1;
    }

    ${media('>tablet')} {
      padding: calc(${gutter} * 3) ${gutter} ${gutter} ${gutter};
    }
  }
`;
