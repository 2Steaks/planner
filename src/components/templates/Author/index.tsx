/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { compose, map } from 'ramda';
import { Breakpoints } from '@project/types';
import { GET_AUTHOR } from '@project/graphql';
import { useGraphQuery } from '@project/hooks';
import {
  Avatar,
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
import { getNextPage, getPrevPage, getRecipes, getRecord } from './model';
import { Recipe } from './Recipe';
import { Profile } from './styles';

export interface AuthorProps {
  id: string;
}

const Recipes = compose(map(Recipe), getRecipes);

/**
 *
 *
 * @returns
 */
const Author: FunctionComponent<AuthorProps> = ({ id }: AuthorProps) => {
  const [page, setPage] = useState<any>(null);

  const { data } = useGraphQuery(
    [`author/${id}`, { id, limit: 10, page }],
    GET_AUTHOR
  );

  const record = getRecord(data);

  function handlePrev() {
    setPage(getPrevPage(data));
  }

  function handleNext() {
    setPage(getNextPage(data));
  }

  return (
    <Fragment>
      <Wrapper
        centered
        constraint={Breakpoints.TINY}
        spacing={WrapperSpacing.LARGE}
        tag="section"
      >
        <Profile>
          <Avatar image={record?.avatar} />
          <Heading tag={HeadingTag.H2}>
            {record?.firstName} {record?.lastName}
          </Heading>
        </Profile>
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

export default Author;
