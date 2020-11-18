/** @format */

import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { compose, map, prop } from 'ramda';
import { Breakpoints } from '@project/types';
import { GET_RECIPES } from '@project/graphql';
import { useGraphQuery, useMediaQuery } from '@project/hooks';
import { useAuth } from '@project/context';
import {
  Avatar,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexColumn,
  FlexJustifyContent,
  Grid,
  Heading,
  HeadingTag,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { Recipe } from './Recipe';
import { getRecords } from './model';

const Recipes = compose(map(Recipe), getRecords);

const Home: FunctionComponent = () => {
  const { user } = useAuth() as any;
  const isTablet = useMediaQuery(`(max-width:${Breakpoints.SMALL})`);
  const { data } = useGraphQuery('recipes', GET_RECIPES);

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
          <FlexColumn>
            <Heading>Home</Heading>
          </FlexColumn>
          <When condition={isTablet}>
            <FlexColumn>
              <Link href="/profile">
                <Avatar image={prop('avatar', user)} />
              </Link>
            </FlexColumn>
          </When>
        </Flex>
      </Wrapper>

      <Heading tag={HeadingTag.H2}>Latest Recipes</Heading>
      <Grid tag="section">{Recipes(data)}</Grid>
    </ErrorBoundary>
  );
};

export default Home;
