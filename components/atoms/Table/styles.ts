/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';
import { colors, gutter } from '@project/theme';

export const styles: SerializedStyles = css`
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHead: StyledComponentWithExtra<ChildrenType> = styled('th')`
  background-color: ${colors.slate100};
  border: solid 1px ${colors.slate100};
  color: ${colors.slate900};
  padding: ${gutter};
  font-weight: bold;
`;

export const TableCell: StyledComponentWithExtra<ChildrenType> = styled('td')`
  padding: ${gutter};
  border-bottom: solid 1px ${colors.slate200};
`;
