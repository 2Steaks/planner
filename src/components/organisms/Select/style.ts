/** @format */

import { MouseEvent } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import {
  colors,
  gutter,
  inputBaseStyle,
  styleWithHelpers
} from '@project/theme';
import { Menu } from '@project/components/atoms/Menu';

type InputWrapperType = ChildrenType & {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};
export const InputWrapper: StyledComponentWithProps<InputWrapperType> = styled(
  'div'
)(
  styleWithHelpers(
    ({ get }): SerializedStyles => css`
      ${inputBaseStyle({ readOnly: get('readOnly') })};
    `
  )
);

type InputFieldType = ChildrenType & any;
export const InputField: StyledComponentWithProps<InputFieldType> = styled(
  'input'
)(
  styleWithHelpers(
    ({ not }): SerializedStyles => css`
      width: ${not('multiple', '100%')};
      padding: calc(${gutter} / 4) 0;
    `
  )
);

export const selectStyle = styleWithHelpers(
  ({ has }): SerializedStyles => css`
    position: relative;

    ${InputWrapper} {
      opacity: ${has('disabled', 0.5)};
      cursor: ${has('disabled', 'not-allowed')};
      border-color: ${has('hasError', colors.red)};
    }

    ${Menu} {
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
    }
  `
);
