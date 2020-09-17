/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { compose, map } from 'ramda';
import { GET_RECIPES } from '@project/graphql';
import { useGraphQuery } from '@project/hooks';
import {
  Button,
  Drawer,
  DrawerPosition,
  ErrorBoundary,
  ErrorFallback,
  Grid,
  Heading,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { Recipe } from './Recipe';
import { getRecords } from './model';

const Recipes = compose(map(Recipe), getRecords);

/**
 *
 *
 * @returns
 */
const RecipesPage: FunctionComponent = () => {
  const { data } = useGraphQuery('recipes', GET_RECIPES);

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Head>
        <title>Recipes page</title>
      </Head>
      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Heading>Recipes</Heading>
      </Wrapper>
      <Grid tag="section">{Recipes(data)}</Grid>
      <Drawer padding position={DrawerPosition.BOTTOM}>
        <Link href="/recipe/create" passHref>
          <Button>Create Recipe</Button>
        </Link>
      </Drawer>
    </ErrorBoundary>
  );
};

export default RecipesPage;
