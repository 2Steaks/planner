/** @format */

import styled from '@emotion/styled';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import { gutter, objectFit } from '@project/theme';
import { Heading, Image, Paper } from '@project/components';

export const Anchor: StyledComponentWithProps<ChildrenType> = styled('a')`
  ${Paper} {
    height: 380px;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
  }

  ${Heading} {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${Image} {
    ${objectFit()};
    height: 200px;
    width: 100%;
  }
`;

export const Description: StyledComponentWithProps<ChildrenType> = styled('p')`
  position: relative;
  overflow: hidden;
  height: 120px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 60%
    );
  }
`;

export const Calories: StyledComponentWithProps<ChildrenType> = styled('p')`
  position: absolute;
  left: ${gutter};
  bottom: ${gutter};
`;
