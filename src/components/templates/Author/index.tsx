/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { Breakpoints } from '@project/types';
import { GET_AUTHOR } from '@project/graphql';
import { useGraphQuery } from '@project/hooks';
import {
  ArticleSkeleton,
  Avatar,
  Button,
  Flex,
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
import { getNextPage, getPrevPage, getRecipes, getRecord } from './model';
import { Profile } from './styles';

export interface AuthorProps {
  id: string;
}

/**
 *
 *
 * @returns
 */
const Author: FunctionComponent<AuthorProps> = ({ id }: AuthorProps) => {
  const [page, setPage] = useState<any>(null);

  const { data } = useGraphQuery(
    [`author/${id}`, { id, limit: 8, page }],
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

export default Author;
