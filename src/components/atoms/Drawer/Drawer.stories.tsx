/** @format */

import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { enumToObject } from '@project/services';
import { Button, Flex, FlexColumn } from '@project/components/atoms';
import { Drawer, DrawerPosition } from './index';

export default {
  title: 'Molecules/Drawer',
  component: Drawer,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <Drawer
      position={select(
        'Position',
        enumToObject(DrawerPosition),
        DrawerPosition.BOTTOM
      )}
    >
      <Flex>
        <FlexColumn>
          <Button>Button One</Button>
        </FlexColumn>
        <FlexColumn>
          <Button>Button Two</Button>
        </FlexColumn>
        <FlexColumn>
          <Button>Button Three</Button>
        </FlexColumn>
      </Flex>
    </Drawer>
  );
};
