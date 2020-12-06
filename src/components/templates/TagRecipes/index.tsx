/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { compose, map } from 'ramda';
import { GET_TAG_BY_NAME } from '@project/graphql';
import { capitalize } from '@project/services';
import { useGraphQuery } from '@project/hooks';
import {
  Button,
  Flex,
  FlexColumn,
  FlexJustifyContent,
  Grid,
  Heading,
  HeadingTag,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getNextPage, getPrevPage, getRecipes } from './model';
import { Recipe } from './Recipe';

export interface TagRecipesProps {
  name: string;
}

const Recipes = compose(map(Recipe), getRecipes);

/**
 *
 *
 * @returns
 */
const TagRecipes: FunctionComponent<TagRecipesProps> = ({
  name
}: TagRecipesProps) => {
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
      <Wrapper spacing={WrapperSpacing.LARGE} tag="section">
        <Heading tag={HeadingTag.H2}>
          Recipes tagged with: {capitalize(name)}
        </Heading>
      </Wrapper>

      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Grid tag="section">{Recipes(data)}</Grid>
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

export default TagRecipes;
