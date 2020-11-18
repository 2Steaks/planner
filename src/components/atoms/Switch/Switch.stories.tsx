/** @format */

import React, { ChangeEvent, useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { Switch } from './index';

export default {
  title: 'Molecules/Switch',
  component: Switch,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  const [checked, setChecked] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  return (
    <Switch
      label="Recieve push notifications"
      name="example"
      onChange={handleChange}
      checked={checked}
    />
  );
};
