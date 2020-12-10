/** @format */

import styled from '@emotion/styled';
import { absoluteFill, colors, gutter, objectFit } from '@project/theme';
import { Heading, Image } from '@project/components';

export const MealBody = styled('div')`
  padding: ${gutter};

  ${Heading} {
    z-index: 1;
    color: ${colors.white};
    position: relative;
    margin: 0;
    max-width: 58%;
  }

  ${Image} {
    ${objectFit()};
    ${absoluteFill};
    z-index: 0;
  }
`;
