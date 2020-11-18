/** @format */

import React from 'react';
import { StoryWrapper } from '@project/utils';
import { withKnobs } from '@storybook/addon-knobs';
import { List, ListItem } from './index';

export default {
  title: 'Atoms/List',
  component: List,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <List>
      <ListItem>Item A</ListItem>
      <ListItem>Column B</ListItem>
      <ListItem>Column C</ListItem>
    </List>
  );
};
