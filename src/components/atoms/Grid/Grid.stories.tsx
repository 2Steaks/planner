/** @format */

import React from 'react';
import styled from '@emotion/styled';
import { StoryWrapper } from '@project/utils';
import { withKnobs } from '@storybook/addon-knobs';
import { Grid, GridColumn } from './index';

export default {
  title: 'Atoms/Grid',
  component: Grid,
  decorators: [StoryWrapper, withKnobs]
};

const Div = styled('div')`
  color: white;
  padding: 10px;
  background-color: ${({ color }) => color};
`;

export const Standard = () => {
  return (
    <Grid>
      <GridColumn xs={4}>
        <Div color="red">Column A</Div>
      </GridColumn>
      <GridColumn xs={4}>
        <Div color="green">Column B</Div>
      </GridColumn>
      <GridColumn xs={4}>
        <Div color="blue">Column C</Div>
      </GridColumn>
    </Grid>
  );
};
