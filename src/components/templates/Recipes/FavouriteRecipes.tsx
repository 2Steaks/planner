/** @format */

// pages/index.js
import React, { Fragment, FunctionComponent, useState } from 'react';
import { compose, map } from 'ramda';
import { GET_USER_FAVOURITE_RECIPES } from '@project/graphql';
import { useGraphQuery } from '@project/hooks';
import { useAuth } from '@project/context';
import {
  Button,
  Flex,
  FlexColumn,
  FlexJustifyContent,
  Grid,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import {
  getFavouriteRecipes,
  getFavouriteRecipesNextPage,
  getFavouriteRecipesPrevPage
} from './model';
import { Recipe } from './Recipe';

export interface FavouriteRecipesProps {
  userId: number;
}

const Recipes = compose(map(Recipe), getFavouriteRecipes);

/**
 *
 *
 * @returns
 */
export const FavouriteRecipes: FunctionComponent = () => {
  const { user } = useAuth() as any;
  const [page, setPage] = useState<any>(null);

  const { data } = useGraphQuery(
    ['favourite-recipes', { id: user.id, limit: 10, page }],
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
        <Grid tag="section">{Recipes(data)}</Grid>
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
