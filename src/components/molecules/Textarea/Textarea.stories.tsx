/** @format */

import React, { ChangeEvent, useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { Textarea } from './index';

export default {
  title: 'Molecules/Textarea',
  component: Textarea,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  const [value, setValue] = useState('');

  return (
    <Textarea
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(event.target.value)
      }
      rows={3}
      value={value}
    />
  );
};
