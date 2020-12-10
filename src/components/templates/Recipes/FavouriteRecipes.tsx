/** @format */

// pages/index.js
import React, { Fragment, FunctionComponent, useState } from 'react';
import { GET_USER_FAVOURITE_RECIPES } from '@project/graphql';
import { useGraphQuery } from '@project/hooks';
import { useAuth } from '@project/context';
import {
  ArticleSkeleton,
  Button,
  Flex,
  FlexColumn,
  FlexJustifyContent,
  Grid,
  GridColumn,
  RecipeArticleWithLink,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import {
  getFavouriteRecipes,
  getFavouriteRecipesNextPage,
  getFavouriteRecipesPrevPage
} from './model';

export interface FavouriteRecipesProps {
  userId: number;
}

/**
 *
 *
 * @returns
 */
export const FavouriteRecipes: FunctionComponent = () => {
  const { user } = useAuth() as any;
  const [page, setPage] = useState<any>(null);

  const { data } = useGraphQuery(
    ['favourite-recipes', { id: user.id, limit: 8, page }],
    GET_USER_FAVOURITE_RECIPES
  );

  function handlePrev() {
    setPage(getFavouriteRecipesPrevPage(data));
  }

  function handleNext() {
    setPage(getFavouriteRecipesNextPage(data));
  }

  return (
    <Fragment>
      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Grid tag="section">
          <When condition={!getFavouriteRecipes(data).length}>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
          </When>
          <When condition={Boolean(getFavouriteRecipes(data).length)}>
            {getFavouriteRecipes(data).map((props: any) => (
              <GridColumn key={props.id} xs={12} sm={6} md={3} tag="article">
                <RecipeArticleWithLink {...props} />
              </GridColumn>
            ))}
          </When>
        </Grid>
      </Wrapper>

      <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
        <When condition={Boolean(getFavouriteRecipesPrevPage(data))}>
          <FlexColumn>
            <Button onClick={handlePrev}>Prev</Button>
          </FlexColumn>
        </When>

        <When condition={Boolean(getFavouriteRecipesNextPage(data))}>
          <FlexColumn>
            <Button onClick={handleNext}>Next</Button>
          </FlexColumn>
        </When>
      </Flex>
    </Fragment>
  );
};
