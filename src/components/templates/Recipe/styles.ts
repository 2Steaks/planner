/** @format */

import styled from '@emotion/styled';
import { objectFit } from '@project/theme';
import { AvatarUploader, Image } from '@project/components';

export const ImageWrapper = styled('div')`
  position: relative;
`;

export const RecipePhoto = styled(Image)`
  ${objectFit()};
  height: 200px;
  width: 100%;
`;

export const RecipePhotoUploader = styled(AvatarUploader)`
  height: 200px;
`;