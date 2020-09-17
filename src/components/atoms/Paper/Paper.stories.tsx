/** @format */

import React from 'react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { Breakpoints } from '@project/types';
import { StoryWrapper } from '@project/utils';
import { enumToObject } from '@project/services';
import { Heading, HeadingTag, Image, Wrapper } from '@project/components';
import { Paper, PaperTheme } from './index';

export default {
  title: 'Atoms/Paper',
  component: Paper,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <Wrapper constraint={Breakpoints.TINY}>
      <Paper
        border={boolean('Has border', false)}
        shadow={boolean('Has shadow', true)}
        theme={select('Theme', enumToObject(PaperTheme), PaperTheme.LIGHT)}
      >
        Im a paper
      </Paper>
    </Wrapper>
  );
};

export const Media = () => {
  return (
    <Wrapper constraint={Breakpoints.TINY}>
      <Paper
        border={boolean('Has border', false)}
        shadow={boolean('Has shadow', true)}
        theme={select('Theme', enumToObject(PaperTheme), PaperTheme.LIGHT)}
      >
        <Image
          src={text(
            'Image source',
            'https://www.readersdigest.ca/wp-content/uploads/2015/11/gourmet-burger-scaled.jpg'
          )}
        />
        <Wrapper padding>
          <Heading tag={HeadingTag.H4}>{text('heading', 'My Burger')}</Heading>
          <p>{text('copy', 'Tasty as fuuuuck')}</p>
        </Wrapper>
      </Paper>
    </Wrapper>
  );
};
