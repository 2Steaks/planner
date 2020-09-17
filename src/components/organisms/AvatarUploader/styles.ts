/** @format */

import { css, SerializedStyles } from '@emotion/core';
import {
  absoluteFill,
  colors,
  objectFit,
  styleWithHelpers
} from '@project/theme';
import { PlusIcon, Image, Input, PencilIcon } from '@project/components';

export const styles = styleWithHelpers(
  ({ ifElse, unless }): SerializedStyles => css`
    position: relative;
    height: 25rem;
    overflow: hidden;

    label {
      background-color: ${colors.slate200};
      width: inherit;
      height: inherit;
      display: block;
      cursor: ${ifElse('disabled', true, 'initial', 'pointer')};
    }

    ${Input} {
      display: none;
    }

    ${Image} {
      ${objectFit()}
      z-index: 1;
      height: 100%;
      width: 100%;
    }

    ${PlusIcon} {
      ${absoluteFill}
      margin: auto;
      width: 20%;
      height: 20%;
      fill: ${colors.slate300};
    }

    ${PencilIcon} {
      fill: white;
      filter: drop-shadow(1px 1px 3px black);
      position: absolute;
      display: none;
      width: 3rem;
      height: 3rem;
      top: 1rem;
      right: 1rem;
    }

    &:hover ${PencilIcon} {
      display: ${unless('disabled', true, 'block')};
    }
  `
);
