/** @format */

import React from 'react';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';
import { StoryWrapper } from '@project/utils';
import { enumToObject } from '@project/services';
import { Button, ButtonVariant } from './index';

export default {
  title: 'Atoms/Button',
  component: Button,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <Button
      href={text('Href', '')}
      variant={select(
        'Variant',
        enumToObject(ButtonVariant),
        ButtonVariant.STANDARD
      )}
      {...actions('onClick')}
    >
      Click me
    </Button>
  );
};
