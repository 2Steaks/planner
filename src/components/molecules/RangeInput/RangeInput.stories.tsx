/** @format */

import React, { ChangeEvent, useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { RangeInput } from './index';

export default {
  title: 'Molecules/RangeInput',
  component: RangeInput,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  const calorieLimit = 800;
  const offset = 200;
  const [value, setValue] = useState<string | number>(0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <RangeInput
      label="Calorie Allowance"
      onChange={handleChange}
      min={0}
      max={calorieLimit + offset}
      value={value}
    />
  );
};
