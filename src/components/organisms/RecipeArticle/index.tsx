/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { compose } from 'ramda';
import { RecipeType } from '@project/types/Recipe';
import { withDisplayName, withMappedProps, withStyle } from '@project/helpers';
import { getCaloriesDividedByServing } from '@project/services';
import { FlexColumn, FlexDirection } from '@project/components/atoms/Flex';
import { GridColumn } from '@project/components/atoms/Grid';
import { HeadingSize, HeadingTag } from '@project/components/atoms/Heading';
import { Paper } from '@project/components/atoms/Paper';
import {
  Body,
  Calories,
  Description,
  Header,
  RecipeFlex,
  RecipeHeading,
  RecipeImage,
  styles
} from './styles';

export enum RecipeArticleLayout {
  HORIZONTAL = FlexDirection.ROW,
  VERTICAL = FlexDirection.COLUMN
}
export interface RecipeArticle extends RecipeType {
  headingSize?: HeadingSize;
  layout?: RecipeArticleLayout;
  isLayoutVertical?: boolean;
}

/**
 *
 *
 * @returns
 */
const Component: FunctionComponent<RecipeArticle> = ({
  headingSize,
  image,
  title,
  description,
  layout,
  ingredients,
  isLayoutVertical,
  serving,
  ...props
}: RecipeArticle) => {
  return (
    <Paper {...props}>
      <RecipeFlex direction={layout} spacing={0}>
        <FlexColumn width="30%">
          <Header isLayoutVertical={isLayoutVertical}>
            <RecipeImage isLayoutVertical={isLayoutVertical} src={image} />
            <Calories isLayoutVertical={isLayoutVertical}>
              calories: {getCaloriesDividedByServing(serving, ingredients)}
            </Calories>
          </Header>
        </FlexColumn>
        <FlexColumn width="70%">
          <Body padding isLayoutVertical={isLayoutVertical}>
            <RecipeHeading
              isLayoutVertical={isLayoutVertical}
              size={headingSize}
              tag={HeadingTag.H4}
            >
              {title}
            </RecipeHeading>
            <Description isLayoutVertical={isLayoutVertical}>
              {description}
            </Description>
          </Body>
        </FlexColumn>
      </RecipeFlex>
    </Paper>
  );
};

const computed = (props: RecipeArticle) => {
  const layout = props.layout || RecipeArticleLayout.VERTICAL;
  const isLayoutVertical = layout === RecipeArticleLayout.VERTICAL;

  return {
    ...props,
    headingSize: isLayoutVertical ? HeadingSize.H4 : HeadingSize.H6,
    isLayoutVertical,
    layout
  };
};

export const RecipeArticle = compose(
  withStyle(compose(styles, computed), [
    'image',
    'title',
    'description',
    'ingredients',
    'isLayoutVertical',
    'layout',
    'serving'
  ]),
  withMappedProps(computed),
  withDisplayName('RecipeArticle')
)(Component);

export const RecipeArticleWithLink: FunctionComponent<RecipeType> = ({
  id,
  ...props
}: RecipeType) => (
  <GridColumn key={id} xs={12} sm={6} md={3} tag="article">
    <Link href="/recipes/[id]" as={`/recipes/${id}`} passHref>
      <a>
        <RecipeArticle {...props} />
      </a>
    </Link>
  </GridColumn>
);
