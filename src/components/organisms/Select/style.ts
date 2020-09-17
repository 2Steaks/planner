/** @format */

import { MouseEvent } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';
import { colors, inputBaseStyle, styleWithHelpers } from '@project/theme';

type InputWrapperType = ChildrenType & {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};
export const InputWrapper: StyledComponentWithExtra<InputWrapperType> = styled(
  'div'
)(
  styleWithHelpers(
    ({ get }): SerializedStyles => css`
      ${inputBaseStyle({ readOnly: get('readOnly') })};
    `
  )
);

type InputFieldType = ChildrenType & any;
export const InputField: StyledComponentWithExtra<InputFieldType> = styled(
  'input'
)(
  styleWithHelpers(
    ({ not }): SerializedStyles => css`
      width: ${not('multiple', '100%')};
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
  `
);
