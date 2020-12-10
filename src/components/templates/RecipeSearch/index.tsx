/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { pathOr } from 'ramda';
import { Breakpoints } from '@project/types';
import { SEARCH_RECIPES } from '@project/graphql';
import { useAuth } from '@project/context';
import { useGraphQuery } from '@project/hooks';
import { BackButton, Input, RangeInput } from '@project/containers';
import {
  AppBar,
  Button,
  ButtonType,
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent,
  Grid,
  GridColumn,
  Heading,
  RecipeArticleWithLink,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getNextPage, getPrevPage, getRecipes } from './model';

const LIMIT = 10;

const RecipeSearch: FunctionComponent = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth() as any;

  const [page, setPage] = useState<string | null>(null);

  const [calories, setCalories] = useState<string | null>(
    pathOr(null, ['query', 'calories'], router)
  );
  const [tags] = useState<string[]>(pathOr([], ['query', 'tags'], router));
  const [title, setTitle] = useState<string | null>(
    pathOr(null, ['query', 'title'], router)
  );

  const { data, isLoading } = useGraphQuery(
    ['search', { title, calories, tags, limit: LIMIT, page }],
    SEARCH_RECIPES
  );

  function handleSubmit(values: any) {
    setCalories(values.calories);
    setTitle(values.title);
  }

  function handlePrev() {
    setPage(getPrevPage(data));
  }

  function handleNext() {
    setPage(getNextPage(data));
  }

  return (
    <Fragment>
      <AppBar isSticky={isAuthenticated}>
        <Wrapper spacing={WrapperSpacing.MEDIUM} tag="section">
          <Flex alignItems={FlexAlignItems.BASELINE}>
            <FlexColumn shrink={1}>
              <BackButton url="/" />
            </FlexColumn>
            <FlexColumn grow={1}>
              <Heading>Search</Heading>
            </FlexColumn>
          </Flex>
        </Wrapper>
      </AppBar>

      <Formik initialValues={{ calories, title, tags }} onSubmit={handleSubmit}>
        <Form>
          <Wrapper constraint={Breakpoints.TINY}>
            <Wrapper spacing={WrapperSpacing.SMALL}>
              <Input disabled={isLoading} label="Recipe Title" name="title" />
            </Wrapper>

            <Wrapper spacing={WrapperSpacing.SMALL}>
              <RangeInput
                disabled={isLoading}
                label="Maximum Calories"
                name="calories"
                min={200}
                max={3000}
                step={50}
              />
            </Wrapper>

            <Wrapper spacing={WrapperSpacing.MEDIUM}>
              <Button disabled={isLoading} type={ButtonType.SUBMIT}>
                Submit
              </Button>
            </Wrapper>
          </Wrapper>
        </Form>
      </Formik>

      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Grid tag="section">
          {getRecipes(data).map((props: any) => (
            <GridColumn key={props.id} xs={12} sm={6} md={3} tag="article">
              <RecipeArticleWithLink {...props} />
            </GridColumn>
          ))}
        </Grid>
      </Wrapper>

      <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
        <FlexColumn>
          <Button
            disabled={!getPrevPage(data) || isLoading}
            onClick={handlePrev}
          >
            Prev
          </Button>
        </FlexColumn>
        <FlexColumn>
          <Button
            disabled={!getNextPage(data) || isLoading}
            onClick={handleNext}
          >
            Next
          </Button>
        </FlexColumn>
      </Flex>
    </Fragment>
  );
};

export default RecipeSearch;
