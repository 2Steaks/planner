/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import media from 'css-in-js-media';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import { colors, gutter } from '@project/theme';

export const styles: SerializedStyles = css`
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHead: StyledComponentWithProps<ChildrenType> = styled('th')`
  background-color: ${colors.slate100};
  border: solid 1px ${colors.slate100};
  color: ${colors.slate900};
  padding: ${gutter};
  font-weight: bold;

  ${media('<tablet')} {
    display: none;
  }
`;

export const TableRow: StyledComponentWithProps<ChildrenType> = styled('tr')`
  ${media('<tablet')} {
    display: flex;
    flex-direction: column;
    margin-bottom: ${gutter};
  }
`;

export const TableCell: StyledComponentWithProps<ChildrenType> = styled('td')`
  border-bottom: solid 1px ${colors.slate200};

  ${media('<tablet')} {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 30% 70%;
    align-items: center;
  }

  ${media('>tablet')} {
    padding: ${gutter};
  }

  &:before {
    ${media('<tablet')} {
      content: attr(data-title);
      padding: ${gutter};
      background-color: ${colors.slate100};
    }
  }
`;
