/** @format */

import React, { FunctionComponent, KeyboardEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { compose, prop } from 'ramda';
import { Breakpoints } from '@project/types';
import { GET_TAG_BY_NAME } from '@project/graphql';
import { getTargetValue, hasValue } from '@project/services';
import { useGraphQuery, useMediaQuery } from '@project/hooks';
import { useAuth } from '@project/context';
import {
  ArticleSkeleton,
  Anchor,
  AppBar,
  Avatar,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent,
  Grid,
  GridColumn,
  Heading,
  HeadingTag,
  RecipeArticleWithLink,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getTagRecipes } from './model';
import { Input } from '@project/components/molecules';

const LIMIT = 4;

const Home: FunctionComponent = () => {
  const { isAuthenticated, user } = useAuth() as any;
  const router = useRouter();
  const isTablet = useMediaQuery(`(max-width:${Breakpoints.SMALL})`);

  const [searchQuery, setSearchQuery] = useState(null);

  const { data: italianRecipes } = useGraphQuery(
    ['tag/italian', { name: 'italian', limit: LIMIT }],
    GET_TAG_BY_NAME
  );

  const { data: indianRecipes } = useGraphQuery(
    ['tag/indian', { name: 'indian', limit: LIMIT }],
    GET_TAG_BY_NAME
  );

  const { data: vegetarianRecipes } = useGraphQuery(
    ['tag/vegetarian', { name: 'vegetarian', limit: LIMIT }],
    GET_TAG_BY_NAME
  );

  function handleSearchKeyPress(event: KeyboardEvent) {
    if (!hasValue(searchQuery) || event.key !== 'Enter') {
      return;
    }

    router.push(`/recipes/search?title=${searchQuery}`);
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <AppBar isSticky={isAuthenticated}>
        <Wrapper
          padding={isAuthenticated && isTablet}
          spacing={WrapperSpacing.SMALL}
        >
          <Flex
            alignItems={FlexAlignItems.CENTER}
            justifyContent={FlexJustifyContent.SPACE_BETWEEN}
          >
            <FlexColumn>
              <Heading dropMargin={isTablet}>Home</Heading>
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
      </AppBar>

      <Wrapper constraint={Breakpoints.TINY} spacing={WrapperSpacing.MEDIUM}>
        <Input
          placeholder="Search recipes..."
          name="recipe_search"
          onChange={compose(setSearchQuery, getTargetValue)}
          onKeyPress={handleSearchKeyPress}
          value={searchQuery}
        />
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
            <Link href={`recipes/tag/italian`} passHref>
              <Anchor>See all</Anchor>
            </Link>
          </FlexColumn>
        </Flex>
        <Grid tag="section">
          <When condition={!getTagRecipes(italianRecipes).length}>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
          </When>
          <When condition={Boolean(getTagRecipes(italianRecipes).length)}>
            {getTagRecipes(italianRecipes).map((props: any) => (
              <GridColumn key={props.id} xs={12} sm={6} md={3} tag="article">
                <RecipeArticleWithLink {...props} />
              </GridColumn>
            ))}
          </When>
        </Grid>
      </Wrapper>

      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Flex
          alignItems={FlexAlignItems.CENTER}
          justifyContent={FlexJustifyContent.SPACE_BETWEEN}
        >
          <FlexColumn>
            <Heading tag={HeadingTag.H2}>Indian Recipes</Heading>
          </FlexColumn>
          <FlexColumn>
            <Link href={`recipes/tag/indian`} passHref>
              <Anchor>See all</Anchor>
            </Link>
          </FlexColumn>
        </Flex>
        <Grid tag="section">
          <When condition={!getTagRecipes(indianRecipes).length}>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
          </When>
          <When condition={Boolean(getTagRecipes(indianRecipes).length)}>
            {getTagRecipes(indianRecipes).map((props: any) => (
              <GridColumn key={props.id} xs={12} sm={6} md={3} tag="article">
                <RecipeArticleWithLink {...props} />
              </GridColumn>
            ))}
          </When>
        </Grid>
      </Wrapper>

      <Flex
        alignItems={FlexAlignItems.CENTER}
        justifyContent={FlexJustifyContent.SPACE_BETWEEN}
      >
        <FlexColumn>
          <Heading tag={HeadingTag.H2}>Vegetarian Recipes</Heading>
        </FlexColumn>
        <FlexColumn>
          <Link href={`recipes/tag/vegetarian`} passHref>
            <Anchor>See all</Anchor>
          </Link>
        </FlexColumn>
      </Flex>
      <Grid tag="section">
        <When condition={!getTagRecipes(vegetarianRecipes).length}>
          <GridColumn xs={12} sm={6} md={3} tag="article">
            <ArticleSkeleton />
          </GridColumn>
          <GridColumn xs={12} sm={6} md={3} tag="article">
            <ArticleSkeleton />
          </GridColumn>
        </When>
        <When condition={Boolean(getTagRecipes(vegetarianRecipes).length)}>
          {getTagRecipes(vegetarianRecipes).map((props: any) => (
            <GridColumn key={props.id} xs={12} sm={6} md={3} tag="article">
              <RecipeArticleWithLink {...props} />
            </GridColumn>
          ))}
        </When>
      </Grid>
    </ErrorBoundary>
  );
};

export default Home;
