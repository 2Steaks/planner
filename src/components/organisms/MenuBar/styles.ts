/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { colors, gutter, objectFit, styleWithHelpers } from '@project/theme';
import { Image, LogoIcon } from '@project/components/atoms';
import { ProgressAPI } from '@project/containers/ProgressAPI';

export const Anchor = styled('a')`
  text-decoration: none;
  color: ${colors.slate900};
  font-weight: bold;
  cursor: pointer;
`;

export const Span = styled('span')`
  font-size: 3rem;
  vertical-align: middle;
  color: ${colors.slate900};
`;

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    background-color: ${colors.beige};

    ${LogoIcon} {
      width: 4rem;
      height: 4rem;
      margin-right: ${gutter};
      vertical-align: middle;
    }

    ${Image} {
      ${objectFit()};
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
      max-width: none;
    }

    & > ${ProgressAPI} {
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: -3px;
      left: 0;
    }
  `
);
