/** @format */

import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { List, ListItem } from '@project/components/molecules/List';
import { DesktopMenuButton, MenuButtonPlacement } from './index';

export default {
  title: 'Molecules/DesktopMenuButton',
  component: DesktopMenuButton,
  decorators: [StoryWrapper, withKnobs]
};

export const Standard = () => {
  return (
    <Flex>
      <FlexColumn grow={1}>hello</FlexColumn>
      <FlexColumn>
        <DesktopMenuButton
          placement={select(
            'Placement',
            MenuButtonPlacement,
            MenuButtonPlacement.AUTO
          )}
        >
          <List align="center">
            <ListItem>
              <a href="/?path=/story/molecules-menubutton--standard">Item A</a>
            </ListItem>
            <ListItem>
              <a href="/?path=/story/molecules-menubutton--standard">Item B</a>
            </ListItem>
            <ListItem>
              <a href="/?path=/story/molecules-menubutton--standard">Item C</a>
            </ListItem>
          </List>
        </DesktopMenuButton>
      </FlexColumn>
    </Flex>
  );
};
