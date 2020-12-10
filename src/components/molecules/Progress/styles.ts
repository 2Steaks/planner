/** @format */

import { css, keyframes, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import { colors, gutter, styleWithHelpers } from '@project/theme';

const backgroundColor = colors.slate300;
const valueColor = colors.green;

const animateProgress = keyframes`
  from {
    background-position: 200% 0;
  }
  
  to {
    background-position: -200% 0;
  }
`;

export const ProgressEl = styled('progress')(
  styleWithHelpers(
    ({ get }): SerializedStyles => css`
      appearance: none;
      position: absolute;
      overflow: hidden;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
      border-radius: 10px;

      &::-webkit-progress-bar {
        background-color: ${backgroundColor};
      }
      &::-webkit-progress-value {
        background-color: ${get('color') ?? valueColor};
      }

      &:indeterminate {
        animation: ${animateProgress} 1.5s linear infinite;
        background-color: ${backgroundColor};
        background-image: linear-gradient(
          to right,
          ${get('color') ?? valueColor} 30%,
          ${backgroundColor} 30%
        );
        background-position: top left;
        background-repeat: no-repeat;
        background-size: 150% 150%;

        &::-webkit-progress-bar {
          background-color: transparent;
        }
      }
    `
  )
);

export const Span: StyledComponentWithProps<ChildrenType> = styled('span')`
  color: white;
  display: block;
  position: relative;
  padding: calc(${gutter} / 2);
  z-index: 1;
  text-align: center;
  font-size: 1.2rem;
`;

export const styles: SerializedStyles = css`
  position: relative;
`;
