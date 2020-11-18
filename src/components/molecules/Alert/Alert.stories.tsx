/** @format */

import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { enumToObject } from '@project/services';
import { Alert, AlertVariant } from './index';

export default {
  title: 'Atoms/Alert',
  component: Alert,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <Alert
      variant={select(
        'Theme',
        enumToObject(AlertVariant),
        AlertVariant.STANDARD
      )}
    >
      Something went wrong
    </Alert>
  );
};
