/** @format */

import { MouseEvent } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import { colors, gutter } from '@project/theme';

export const styles: SerializedStyles = css`
  position: relative;
  padding: calc(${gutter} / 4) calc(${gutter} / 2);
  background: ${colors.blue};
  border-radius: 2.5px;
  min-width: 50px;
  color: ${colors.white};
`;

export const TagContent: StyledComponentWithProps<ChildrenType> = styled(
  'span'
)`
  font-size: 1.4rem;
  text-transform: capitalize;
`;

type TagIconTypes = ChildrenType & {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};
export const TagIcon: StyledComponentWithProps<TagIconTypes> = styled('div')`
  cursor: pointer;
  width: 0.8rem;
  height: 0.8rem;
  position: relative;
  top: 2px;

  svg {
    width: 100%;
    height: 100%;
    fill: ${colors.white};
    display: block;
  }
`;
