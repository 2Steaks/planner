/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { rgba } from 'polished';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { AlertVariant } from './index';

export const Circle: StyledComponentWithExtra<ChildrenType> = styled('div')`
  padding: 1rem;
  border-radius: 50%;
  background-color: ${rgba(colors.white, 0.3)};
`;

export const styles = styleWithHelpers(
  ({ cond, has }): SerializedStyles => css`
    padding: ${gutter};
    border: 1px solid transparent;
    border-radius: 5px;
    align-items: center;
    color: ${colors.white};
    cursor: ${has('onClick', 'pointer')};

    background-color: ${cond('variant', {
      [AlertVariant.ERROR]: colors.red,
      [AlertVariant.INFO]: colors.blue,
      [AlertVariant.SUCCESS]: colors.green,
      [AlertVariant.WARNING]: colors.orange,
      default: colors.slate900
    })};

    ${Flex} ${FlexColumn}:first-of-type {
      border-right: 2px solid ${rgba(colors.slate900, 0.1)};
    }

    ${Circle} > svg {
      height: 1.2rem;
      width: 1.2rem;
      fill: ${colors.white};
    }
  `
);
