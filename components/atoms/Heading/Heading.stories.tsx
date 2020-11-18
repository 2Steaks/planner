/** @format */

import React from 'react';
import { StoryWrapper } from '@project/utils';
import { select, withKnobs } from '@storybook/addon-knobs';
import { Heading, HeadingTag } from './index';

export default {
  title: 'Atoms/Heading',
  component: Heading,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <Heading tag={select('Size', HeadingTag, HeadingTag.H1)}>A Heading</Heading>
  );
};
