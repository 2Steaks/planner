/** @format */

import styled from '@emotion/styled';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';
import { Heading } from '@project/components';

export const Article: StyledComponentWithExtra<ChildrenType> = styled(
  'article'
)`
  ${Heading} {
    margin: 0;
  }
`;
