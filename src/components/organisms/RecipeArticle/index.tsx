/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { RecipeType } from '@project/types/Recipe';
import { getCaloriesDividedByServing } from '@project/services';
import {
  Heading,
  HeadingTag,
  Image,
  Paper,
  Wrapper
} from '@project/components';
import { Anchor, Calories, Description } from './styles';

/**
 *
 *
 * @returns
 */
export const RecipeArticle: FunctionComponent<RecipeType> = ({
  id,
  image,
  title,
  description,
  ingredients,
  serving
}: RecipeType) => {
  return (
    <Link href="/recipes/[id]" as={`/recipes/${id}`} passHref>
      <Anchor>
        <Paper>
          <Image src={image} />
          <Wrapper padding>
            <Heading tag={HeadingTag.H4}>{title}</Heading>
            <Description>{description}</Description>
            <Calories>
              calories: {getCaloriesDividedByServing(serving, ingredients)}
            </Calories>
            {/* <div>{tags}</div> */}
          </Wrapper>
        </Paper>
      </Anchor>
    </Link>
  );
};
