/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { GET_USER_OWN_RECIPES } from '@project/graphql';
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
  getMyRecipes,
  getMyRecipesNextPage,
  getMyRecipesPrevPage
} from './model';

export interface MyRecipesProps {
  userId: number;
}

/**
 *
 *
 * @returns
 */
export const MyRecipes: FunctionComponent = () => {
  const { user } = useAuth() as any;
  const [page, setPage] = useState<any>(null);

  const { data } = useGraphQuery(
    ['my-recipes', { id: user.id, limit: 8, page }],
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
        <Grid tag="section">
          <When condition={!getMyRecipes(data).length}>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
          </When>
          <When condition={Boolean(getMyRecipes(data).length)}>
            {getMyRecipes(data).map((props: any) => (
              <GridColumn key={props.id} xs={12} sm={6} md={3} tag="article">
                <RecipeArticleWithLink {...props} />
              </GridColumn>
            ))}
          </When>
        </Grid>
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
