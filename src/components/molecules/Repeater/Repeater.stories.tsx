/** @format */

import React, { useState } from 'react';
import * as R from 'ramda';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { Repeater, RepeaterRowProps } from './index';

export default {
  title: 'Molecules/Repeater',
  component: Repeater,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  const [value, setValue] = useState([{ cabbage: '' }]);

  return (
    <Repeater
      isDisabled={boolean('Is disabled', false)}
      name="example"
      onChange={console.log}
      onAdd={R.compose(
        setValue,
        R.insert(R.__ as any, R.__, value as any) as any
      )}
      onMove={console.log}
      onRemove={R.compose(
        setValue,
        R.remove(R.__ as any, 1, value as any) as any
      )}
      label={text('Label text', 'Example Label')}
      value={value}
    >
      {({ index }: RepeaterRowProps) => <span>Row {index}</span>}
    </Repeater>
  );
};
