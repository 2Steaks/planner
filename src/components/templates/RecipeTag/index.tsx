/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { GET_TAG_BY_NAME } from '@project/graphql';
import { capitalize } from '@project/services';
import { useAuth } from '@project/context';
import { useGraphQuery } from '@project/hooks';
import { BackButton } from '@project/containers';
import {
  ArticleSkeleton,
  AppBar,
  Button,
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent,
  Grid,
  GridColumn,
  Heading,
  RecipeArticleWithLink,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getNextPage, getPrevPage, getRecipes } from './model';

export interface RecipeTagProps {
  name: string;
}

/**
 *
 *
 * @returns
 */
const RecipeTag: FunctionComponent<RecipeTagProps> = ({
  name
}: RecipeTagProps) => {
  const { isAuthenticated } = useAuth() as any;
  const [page, setPage] = useState<any>(null);

  const { data } = useGraphQuery(
    [`tag/${name}`, { name, limit: 10, page }],
    GET_TAG_BY_NAME
  );

  function handlePrev() {
    setPage(getPrevPage(data));
  }

  function handleNext() {
    setPage(getNextPage(data));
  }

  return (
    <Fragment>
      <AppBar isSticky={isAuthenticated}>
        <Wrapper spacing={WrapperSpacing.SMALL} tag="section">
          <Flex alignItems={FlexAlignItems.BASELINE}>
            <FlexColumn shrink={1}>
              <BackButton />
            </FlexColumn>
            <FlexColumn grow={1}>
              <Heading> {capitalize(name)} Recipes</Heading>
            </FlexColumn>
          </Flex>
        </Wrapper>
      </AppBar>

      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Grid tag="section">
          <When condition={!getRecipes(data).length}>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
            <GridColumn xs={12} sm={6} md={3} tag="article">
              <ArticleSkeleton />
            </GridColumn>
          </When>
          <When condition={Boolean(getRecipes(data).length)}>
            {getRecipes(data).map((props: any) => (
              <GridColumn key={props.id} xs={12} sm={6} md={3} tag="article">
                <RecipeArticleWithLink {...props} />
              </GridColumn>
            ))}
          </When>
        </Grid>
      </Wrapper>

      <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
        <FlexColumn>
          <Button disabled={!getPrevPage(data)} onClick={handlePrev}>
            Prev
          </Button>
        </FlexColumn>
        <FlexColumn>
          <Button disabled={!getNextPage(data)} onClick={handleNext}>
            Next
          </Button>
        </FlexColumn>
      </Flex>
    </Fragment>
  );
};

export default RecipeTag;
