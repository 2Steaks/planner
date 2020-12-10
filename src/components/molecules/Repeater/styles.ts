/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import { colors, gutter } from '@project/theme';

export const Row: StyledComponentWithProps<ChildrenType> = styled('div')`
  margin-bottom: ${gutter};
`;

export const RowContent: StyledComponentWithProps<ChildrenType> = styled('div')`
  background-color: ${colors.slate100};
  border-radius: 5px;
  padding: ${gutter};
  margin-bottom: ${gutter};
`;

export const RowActions: StyledComponentWithProps<ChildrenType> = styled('div')`
  svg {
    width: 1rem;
    height: 1rem;
    fill: white;
  }
`;

export const styles: SerializedStyles = css``;
