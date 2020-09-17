/** @format */

import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';
import { StoryWrapper } from '@project/utils';
import { AvatarUploader } from './index';

export default {
  title: 'Molecules/AvatarUploader',
  component: AvatarUploader,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return <AvatarUploader name="test" {...actions('onChange')} />;
};
