/** @format */

import styled from '@emotion/styled';
import { colors, gutter, objectFit } from '@project/theme';
import { AvatarUploader, Image, List, Wrapper } from '@project/components';

export const ImageWrapper = styled('div')`
  position: relative;
`;

export const InfoParagraph = styled('p')`
  margin-bottom: calc(${gutter} / 2);
`;

export const InfoWrapper = styled(Wrapper)`
  span {
    vertical-align: middle;
  }
`;

export const IngredientList = styled(List)`
  width: 100%;
`;

export const RecipePhoto = styled(Image)`
  ${objectFit()};
  height: 200px;
  width: 100%;
`;

export const RecipePhotoUploader = styled(AvatarUploader)`
  height: 200px;
`;

export const TagAnchor = styled('a')`
  color: ${colors.white};
`;
