/** @format */

// pages/index.js
import React, { Fragment, FunctionComponent, useState } from 'react';
import { compose, map } from 'ramda';
import { GET_USER_OWN_RECIPES } from '@project/graphql';
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
  getMyRecipes,
  getMyRecipesNextPage,
  getMyRecipesPrevPage
} from './model';
import { Recipe } from './Recipe';

export interface MyRecipesProps {
  userId: number;
}

const Recipes = compose(map(Recipe), getMyRecipes);

/**
 *
 *
 * @returns
 */
export const MyRecipes: FunctionComponent = () => {
  const { user } = useAuth() as any;
  const [page, setPage] = useState<any>(null);

  const { data } = useGraphQuery(
    ['my-recipes', { id: user.id, limit: 10, page }],
    GET_USER_OWN_RECIPES
  );

  function handlePrev() {
    setPage(getMyRecipesPrevPage(data));
  }

  function handleNext() {
    setPage(getMyRecipesNextPage(data));
  }

  return (
    <Fragment>
      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Grid tag="section">{Recipes(data)}</Grid>
      </Wrapper>

      <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
        <When condition={Boolean(getMyRecipesPrevPage(data))}>
          <FlexColumn>
            <Button onClick={handlePrev}>Prev</Button>
          </FlexColumn>
        </When>

        <When condition={Boolean(getMyRecipesNextPage(data))}>
          <FlexColumn>
            <Button onClick={handleNext}>Next</Button>
          </FlexColumn>
        </When>
      </Flex>
    </Fragment>
  );
};
