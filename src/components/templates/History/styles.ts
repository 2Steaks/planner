/** @format */

import styled from '@emotion/styled';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import { Heading } from '@project/components';

export const Article: StyledComponentWithProps<ChildrenType> = styled(
  'article'
)`
  ${Heading} {
    margin: 0;
  }
`;
