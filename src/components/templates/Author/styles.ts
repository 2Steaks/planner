/** @format */

import styled from '@emotion/styled';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';
import { gutter } from '@project/theme';
import { Avatar } from '@project/components';

export const Profile: StyledComponentWithExtra<ChildrenType> = styled('div')`
  text-align: center;

  ${Avatar} > img {
    width: 8rem;
    height: 8rem;
    margin: 0 auto ${gutter} auto;
  }
`;
