/** @format */

import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { rgba } from 'polished';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import {
  colors,
  fontSize,
  gutter,
  objectFit,
  styleWithHelpers
} from '@project/theme';
import { Flex } from '@project/components/atoms/Flex';
import { Heading, HeadingProps } from '@project/components/atoms/Heading';
import { Image, ImageProps } from '@project/components/atoms/Image';
import { Wrapper } from '@project/components/atoms/Wrapper';

export const styles = styleWithHelpers(
  ({ ifElse }): SerializedStyles => css`
    height: ${ifElse('isLayoutVertical', true, 'auto', '100px')};
    overflow: hidden;
    position: relative;
    border-radius: 5px;
  `
);

export const Header = styled('div')(
  styleWithHelpers(
    (): SerializedStyles => css`
      height: 100%;
      position: relative;
    `
  )
);

export const Body = styled(Wrapper)(
  styleWithHelpers(
    ({ ifElse }): SerializedStyles => css`
      position: relative;
      overflow: hidden;
      height: ${ifElse('isLayoutVertical', true, '170px', '100%')};

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          ${rgba(colors.white, 0)} 50%,
          ${rgba(colors.white, 1)} 90%
        );
        z-index: 0;
      }
    `
  )
);

export const RecipeFlex = styled(Flex)`
  height: 100%;
`;

type RecipeHeadingProps = HeadingProps & {
  isLayoutVertical?: boolean;
};
export const RecipeHeading: StyledComponentWithProps<RecipeHeadingProps> = styled(
  Heading
)(
  styleWithHelpers(
    ({ ifElse }): SerializedStyles => css`
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: ${ifElse('isLayoutVertical', true, 'nowrap', 'initial')};
    `
  )
);

type RecipeImageProps = ImageProps & { isLayoutVertical?: boolean };
export const RecipeImage: StyledComponentWithProps<RecipeImageProps> = styled(
  Image
)(
  styleWithHelpers(
    ({ ifElse }): SerializedStyles => css`
      ${objectFit()};
      width: 100%;
      height: ${ifElse('isLayoutVertical', true, '150px', '100%')};
    `
  )
);

type DescriptionProps = ChildrenType & {
  isLayoutVertical?: boolean;
};
export const Description: StyledComponentWithProps<DescriptionProps> = styled(
  'p'
)(
  styleWithHelpers(
    ({ ifElse }): SerializedStyles => css`
      font-size: ${ifElse('isLayoutVertical', true, fontSize.P2, fontSize.P1)};
      line-height: ${ifElse('isLayoutVertical', true, 1.4, 1.2)};
    `
  )
);

type CaloriesProps = ChildrenType & { isLayoutVertical?: boolean };
export const Calories: StyledComponentWithProps<CaloriesProps> = styled('p')(
  styleWithHelpers(
    ({ ifElse, not }): SerializedStyles => css`
      display: inline-block;
      position: absolute;
      z-index: 1;
      text-shadow: 0px 0px 4px ${colors.black};
      color: ${colors.white};
      font-size: ${ifElse('isLayoutVertical', true, fontSize.P2, fontSize.P1)};
      left: ${ifElse('isLayoutVertical', true, 'auto', gutter)};
      right: ${gutter};
      bottom: ${ifElse('isLayoutVertical', true, gutter, 0)};
      text-align: ${not('isLayoutVertical', 'center')};
    `
  )
);
