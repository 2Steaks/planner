/** @format */

import React from 'react';
import styled from '@emotion/styled';
import { StoryWrapper } from '@project/utils';
import { withKnobs } from '@storybook/addon-knobs';
import { Flex, FlexColumn } from './index';

export default {
  title: 'Atoms/Flex',
  component: Flex,
  decorators: [StoryWrapper, withKnobs]
};

const Div = styled('div')`
  color: white;
  padding: 10px;
  background-color: ${({ color }) => color};
`;

export const Standard = () => {
  return (
    <Flex>
      <FlexColumn>
        <Div color="red">Column A</Div>
      </FlexColumn>
      <FlexColumn>
        <Div color="green">Column B</Div>
      </FlexColumn>
      <FlexColumn>
        <Div color="blue">Column C</Div>
      </FlexColumn>
    </Flex>
  );
};
