/** @format */

import React, { useState } from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { Select } from './index';

export default {
  title: 'Molecules/Select',
  component: Select,
  decorators: [StoryWrapper, withKnobs]
};

const options = [
  {
    label: 'One',
    value: 1
  },
  {
    label: 'Two',
    value: 2
  },
  {
    label: 'Three',
    value: 3
  },
  {
    label: 'Four',
    value: 4
  },
  {
    label: 'Five',
    value: 5
  },
  {
    label: 'Six',
    value: 6
  },
  {
    label: 'Seven',
    value: 7
  },
  {
    label: 'Eight',
    value: 8
  },
  {
    label: 'Nine',
    value: 9
  },
  {
    label: 'Ten',
    value: 10
  },
  {
    label: 'Eleven',
    value: 11
  },
  {
    label: 'Twelve',
    value: 12
  }
];

export const Standard = () => {
  const [value, setValue] = useState('');

  return (
    <Select
      label={text('Label text', 'The Label')}
      options={options}
      onChange={setValue}
      value={value}
    />
  );
};

export const Multiple = () => {
  const [value, setValue] = useState([]);

  return (
    <Select
      label={text('Label text', 'The Label')}
      multiple
      options={options}
      onChange={setValue}
      value={value}
    />
  );
};

export const ServerOptions = () => {
  const [value, setValue] = useState('');

  return (
    <Select
      label={text('Label text', 'The Label')}
      multiple={boolean('is Multiple', false)}
      options={options}
      onChange={setValue}
      onServer={console.log}
      value={value}
    />
  );
};
