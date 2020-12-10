/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { StyledComponentWithProps, ChildrenType } from '@project/types';
import { objectFit } from '@project/theme';
import { RecipeType } from '@project/types/Recipe';
import {
  GridColumn,
  RecipeArticle,
  Heading,
  Image,
  Paper
} from '@project/components';

export const Anchor: StyledComponentWithProps<ChildrenType> = styled('a')`
  ${Paper} {
    height: 380px;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
  }

  ${Heading} {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${Image} {
    ${objectFit()};
    height: 200px;
    width: 100%;
  }
`;

/**
 *
 *
 * @returns
 */
export const Recipe: FunctionComponent<RecipeType> = ({
  id,
  ...props
}: RecipeType) => {
  return (
    <GridColumn key={id} xs={12} sm={6} md={3} tag="article">
      <Link href="/recipes/[id]" as={`/recipes/${id}`} passHref>
        <Anchor>
          <RecipeArticle id={id} {...props} />
        </Anchor>
      </Link>
    </GridColumn>
  );
};
