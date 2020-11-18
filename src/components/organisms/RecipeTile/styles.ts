/** @format */

import styled from '@emotion/styled';
import { absoluteFill, colors, gutter, objectFit } from '@project/theme';
import { Heading } from '@project/components/atoms/Heading';
import { Image } from '@project/components/atoms/Image';

export const MealBody = styled('div')`
  padding: ${gutter};

  ${Heading} {
    z-index: 1;
    color: ${colors.white};
    position: relative;
    margin: 0;
  }

  ${Image} {
    ${objectFit()};
    ${absoluteFill};
    z-index: 0;
  }
`;
