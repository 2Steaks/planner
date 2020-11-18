/** @format */

import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryWrapper } from '@project/utils';
import { Table } from './index';

export default {
  title: 'Atoms/Table',
  component: Table,
  decorators: [StoryWrapper, withKnobs]
};

const columns = [
  {
    Header: 'Column 1',
    accessor: 'col1' // accessor is the "key" in the data
  },
  {
    Header: 'Column 2',
    accessor: 'col2'
  }
];

const data = [
  {
    col1: 'Hello',
    col2: 'World'
  },
  {
    col1: 'react-table',
    col2: 'rocks'
  },
  {
    col1: 'whatever',
    col2: 'you want'
  }
];

export const Standard = () => {
  return (
    <Table columns={columns} data={data}>
      Click me
    </Table>
  );
};
