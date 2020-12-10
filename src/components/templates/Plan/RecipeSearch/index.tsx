/** @format */

import React, { FunctionComponent, useState } from 'react';
import { useFormikContext } from 'formik';
import { equals } from 'ramda';
import { Breakpoints } from '@project/types';
import { SEARCH_RECIPES } from '@project/graphql';
import { getCaloriesDividedByServing } from '@project/services';
import { useGraphQuery } from '@project/hooks';
import { Input, RangeInput } from '@project/containers';
import {
  Button,
  Flex,
  FlexColumn,
  FlexJustifyContent,
  GridColumn,
  RecipeArticleLayout,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getNextPage, getPrevPage, getRecipes } from './model';
import { PlanRecipeArticle, PlanRecipeGrid } from './styles';

export const RecipeSearch: FunctionComponent = () => {
  const { values, setFieldValue } = useFormikContext();

  const formValues = values as any;
  const [page, setPage] = useState<string | null>();
  const [query, setQuery] = useState<any>({
    calories: null,
    tags: [],
    title: null
  });
  const [tags] = useState<string[]>([]);
  const [title, setTitle] = useState<string | null>(formValues.title);
  const [calories, setCalories] = useState<number>(
    getCaloriesDividedByServing(formValues.serving, formValues.ingredients)
  );

  const { data, isLoading } = useGraphQuery(
    ['search', { limit: 10, page, ...query }],
    SEARCH_RECIPES
  );

  function handleSubmit() {
    setQuery({
      calories: Number(calories),
      tags,
      title
    });
  }

  function handlePrev() {
    setPage(getPrevPage(data));
  }

  function handleNext() {
    setPage(getNextPage(data));
  }

  function handleRecipeClick(id: string) {
    return function () {
      setFieldValue('id', id);
    };
  }

  return (
    <Wrapper constraint={Breakpoints.SMALL}>
      <Flex direction="column">
        <FlexColumn>
          <Wrapper spacing={WrapperSpacing.SMALL}>
            <Input
              disabled={isLoading}
              label="Recipe Title"
              name="title"
              onChange={(e: any) => setTitle(e.target.value)}
              value={title}
            />
          </Wrapper>
          <Wrapper spacing={WrapperSpacing.SMALL}>
            <RangeInput
              disabled={isLoading}
              label="Maximum Calories"
              name="calories"
              min={200}
              max={3000}
              step={50}
              onChange={(e: any) => setCalories(e.target.value)}
              value={calories}
            />
          </Wrapper>
          <Button disabled={isLoading} onClick={handleSubmit}>
            Submit
          </Button>
        </FlexColumn>
        <FlexColumn style={{ overflow: 'auto' }}>
          <Wrapper spacing={WrapperSpacing.SMALL}>
            <PlanRecipeGrid>
              {getRecipes(data).map((props: any) => (
                <GridColumn key={props.id} xs={12} sm={6}>
                  <PlanRecipeArticle
                    {...props}
                    isActive={equals(formValues.id, props.id)}
                    layout={RecipeArticleLayout.HORIZONTAL}
                    onClick={handleRecipeClick(props.id)}
                  />
                </GridColumn>
              ))}
            </PlanRecipeGrid>
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
        </FlexColumn>
      </Flex>
    </Wrapper>
  );
};
