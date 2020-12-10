/** @format */

import React from 'react';
import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { Breakpoints } from '@project/types';
import { StoryWrapper } from '@project/utils';
import { Wrapper } from '@project/components/atoms/Wrapper';
import { RecipeArticle, RecipeArticleLayout } from './index';

export default {
  title: 'Organisms/RecipeArticle',
  component: RecipeArticle,
  decorators: [StoryWrapper, withKnobs]
};

const ingredients: any[] = [
  {
    calories: 222
  },
  {
    calories: 111
  }
];

export const Standard = () => {
  return (
    <Wrapper constraint={Breakpoints.TINY}>
      <RecipeArticle
        image={text(
          'The Image',
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190322-ham-sandwich-horizontal-1553721016.png'
        )}
        layout={select(
          'Layout',
          [RecipeArticleLayout.VERTICAL, RecipeArticleLayout.HORIZONTAL],
          RecipeArticleLayout.VERTICAL
        )}
        title={text('The Title', 'A Recipe')}
        description={text('The Description', 'Some text')}
        ingredients={ingredients}
        serving={number('The Serving', 2)}
      />
    </Wrapper>
  );
};
