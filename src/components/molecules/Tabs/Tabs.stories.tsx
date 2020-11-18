/** @format */

import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { Tabs, Tab } from './index';

export default {
  title: 'Atoms/Tabs',
  component: Tabs,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  const [index, setIndex] = useState(0);

  return (
    <Tabs onChange={setIndex} value={index}>
      <Tab index={0} label="tab a">
        Tab A
      </Tab>
      <Tab index={1} label="tab b">
        Tab B
      </Tab>
      <Tab index={2} label="tab c">
        Tab C
      </Tab>
    </Tabs>
  );
};
