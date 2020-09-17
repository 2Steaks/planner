/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';
import { colors, gutter } from '@project/theme';

export const Row: StyledComponentWithExtra<ChildrenType> = styled('div')`
  background-color: ${colors.slate100};
  display: flex;
  padding: ${gutter};
`;

export const ColumnLeft: StyledComponentWithExtra<ChildrenType> = styled('div')`
  flex: 1;
`;

export const ColumnRight: StyledComponentWithExtra<ChildrenType> = styled(
  'div'
)`
  padding-left: ${gutter};
  display: flex;
  flex-direction: column;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const styles: SerializedStyles = css``;
