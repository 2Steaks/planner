/** @format */

import React from 'react';
import styled from '@emotion/styled';
import { select, withKnobs } from '@storybook/addon-knobs';
import { Breakpoints } from '@project/types';
import { StoryWrapper } from '@project/utils';
import { enumToObject } from '@project/services';
import { Wrapper, WrapperSpacing } from './index';

export default {
  title: 'Atoms/Wrapper',
  component: Wrapper,
  decorators: [StoryWrapper, withKnobs]
};

const Div = styled('div')`
  color: white;
  padding: 10px;
  background-color: ${({ color }) => color};
`;

export const Standard = () => {
  return (
    <>
      <Wrapper
        constraint={select('Constraint', Breakpoints, null)}
        spacing={select('Spacing', enumToObject(WrapperSpacing), null)}
        style={{ backgroundColor: 'lightgreen' }}
      >
        <Div color="red">Some inner content</Div>
      </Wrapper>
      <Div color="blue">Some outside content</Div>
    </>
  );
};
