/** @format */

import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { map, prop } from 'ramda';
import { Breakpoints } from '@project/types';
import { GET_TAG_BY_NAME } from '@project/graphql';
import { useGraphQuery, useMediaQuery } from '@project/hooks';
import { useAuth } from '@project/context';
import {
  Anchor,
  Avatar,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexAlignItems,
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
import { getTagRecipes } from './model';

const Recipes = map(Recipe);

const Home: FunctionComponent = () => {
  const { isAuthenticated, user } = useAuth() as any;
  const isTablet = useMediaQuery(`(max-width:${Breakpoints.SMALL})`);

  const { data: italianRecipes } = useGraphQuery(
    [`tag/italian`, { name: 'italian', limit: 5 }],
    GET_TAG_BY_NAME
  );

  const { data: indianRecipes } = useGraphQuery(
    [`tag/indian`, { name: 'indian', limit: 5 }],
    GET_TAG_BY_NAME
  );

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
          <FlexColumn>
            <Heading>Home</Heading>
          </FlexColumn>
          <When condition={isAuthenticated && isTablet}>
            <FlexColumn>
              <Link href="/profile">
                <Avatar image={prop('avatar', user)} />
              </Link>
            </FlexColumn>
          </When>
        </Flex>
      </Wrapper>

      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Flex
          alignItems={FlexAlignItems.CENTER}
          justifyContent={FlexJustifyContent.SPACE_BETWEEN}
        >
          <FlexColumn>
            <Heading tag={HeadingTag.H2}>Italian Recipes</Heading>
          </FlexColumn>
          <FlexColumn>
            <Link href={`/tag/italian`} passHref>
              <Anchor>See all</Anchor>
            </Link>
          </FlexColumn>
        </Flex>
        <Grid tag="section">{Recipes(getTagRecipes(italianRecipes))}</Grid>
      </Wrapper>

      <Flex
        alignItems={FlexAlignItems.CENTER}
        justifyContent={FlexJustifyContent.SPACE_BETWEEN}
      >
        <FlexColumn>
          <Heading tag={HeadingTag.H2}>Indian Recipes</Heading>
        </FlexColumn>
        <FlexColumn>
          <Link href={`/tag/indian`} passHref>
            <Anchor>See all</Anchor>
          </Link>
        </FlexColumn>
      </Flex>
      <Grid tag="section">{Recipes(getTagRecipes(indianRecipes))}</Grid>
    </ErrorBoundary>
  );
};

export default Home;
