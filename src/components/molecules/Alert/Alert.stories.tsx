/** @format */

import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { enumToObject } from '@project/services';
import { Alert, AlertTheme } from './index';

export default {
  title: 'Atoms/Alert',
  component: Alert,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <Alert
      theme={select('Theme', enumToObject(AlertTheme), AlertTheme.STANDARD)}
    >
      Something went wrong
    </Alert>
  );
};
