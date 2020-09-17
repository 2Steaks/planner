/** @format */

import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { Modal } from './index';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <Modal isActive title={text('Title', 'The Title')}>
      Content
    </Modal>
  );
};
