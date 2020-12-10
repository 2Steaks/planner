/** @format */

import React, { FunctionComponent } from 'react';
import { useFormikContext } from 'formik';
import { useRowSelect } from 'react-table';
import { propOr } from 'ramda';
import styled from '@emotion/styled';
import { colors, gutter } from '@project/theme';
import { Input as InputField } from '@project/containers';
import { Input, InputVariant, InputType, Table } from '@project/components';
import { getColumnValue, getRequiredAmount } from './model';

const InputWrapper = styled.div`
  padding: 10px;
  width: 100%;
  position: relative;
  left: calc(-${gutter} / 2);
  box-shadow: inset 0px 0px 5px 0px ${colors.slate400};

  input {
    width: 100%;
  }
`;

const RowSelector = (props: any) => {
  const { setFieldValue } = useFormikContext();
  const amount = getColumnValue('amount')(props);
  const stock = getColumnValue('stock')(props);
  const isChecked = stock >= amount;

  function handleChange() {
    const value = isChecked ? null : amount;
    setFieldValue(`ingredients.${props.row.index}.stock`, value);
  }

  return (
    <Input
      checked={isChecked}
      onChange={handleChange}
      type={InputType.CHECKBOX}
    />
  );
};

const EditableField = (props: any) => {
  return (
    <InputWrapper>
      <InputField
        name={`ingredients.${props.row.index}.stock`}
        variant={InputVariant.NONE}
        type={InputType.NUMBER}
      />
    </InputWrapper>
  );
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

const getHooks = ({ visibleColumns }: any) =>
  visibleColumns.push((columns: any) => [
    {
      id: 'selection',
      Cell: RowSelector
    },
    ...columns
  ]);

export const ShoppingTable: FunctionComponent = () => {
  const { values } = useFormikContext();
  const options = [useRowSelect, getHooks];

  return (
    <Table
      columns={columnList}
      data={propOr([], 'ingredients', values)}
      options={options}
    />
  );
};
