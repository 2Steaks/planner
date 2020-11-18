/** @format */

import styled from '@emotion/styled';
import { StyledComponentWithExtra } from '@project/types';
import { colors, gutter } from '@project/theme';

const toggleSize = '1.8rem';
const transitionSpeed = '0.2s';

export const Span = styled('span')`
  display: block;
  margin-bottom: ${gutter};
`;

export const Slider = styled('span')`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.slate300};
  transition: ${transitionSpeed};
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: ${toggleSize};
    width: ${toggleSize};
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    background-color: white;
    transition: ${transitionSpeed};
  }
`;

export const Label: StyledComponentWithExtra<any> = styled('label')`
  position: relative;
  display: inline-block;
  width: 5rem;
  height: 2.6rem;

  & > input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & > input:checked + ${Slider} {
    background-color: ${colors.blue};
  }

  & > input:focus + ${Slider} {
    box-shadow: 0 0 1px ${colors.blue};
  }

  & > input:checked + ${Slider}:before {
    transform: translateX(2.4rem);
  }
`;
