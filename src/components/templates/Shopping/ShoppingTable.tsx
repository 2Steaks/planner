/** @format */

import React, { FunctionComponent } from 'react';
import { Input } from '@project/containers';
import { Table } from '@project/components';
import { getRequiredAmount } from './model';

export interface ShoppingTableProps {
  data: [];
}

const EditableField = (props: any) => {
  return <Input name={`ingredients.${props.row.index}.stock`} />;
};

const columnList = [
  {
    accessor: 'name',
    Header: 'Name'
  },
  {
    accessor: 'amount',
    Header: 'Amount'
  },
  {
    accessor: 'required',
    Header: 'Required',
    Cell: getRequiredAmount
  },
  {
    accessor: 'stock',
    Header: 'In Stock',
    Cell: EditableField
  },
  {
    accessor: 'unit',
    Header: 'Unit'
  }
];

export const ShoppingTable: FunctionComponent<ShoppingTableProps> = ({
  data
}: ShoppingTableProps) => {
  return <Table columns={columnList} data={data} />;
};
