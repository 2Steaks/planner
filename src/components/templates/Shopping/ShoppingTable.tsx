/** @format */

import React, { FunctionComponent } from 'react';
import { useFormikContext } from 'formik';
import { propOr } from 'ramda';
import styled from '@emotion/styled';
import { colors, gutter } from '@project/theme';
import { Input } from '@project/containers';
import { InputVariant, InputType, Table } from '@project/components';
import { getRequiredAmount } from './model';

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

const EditableField = (props: any) => {
  return (
    <InputWrapper>
      <Input
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

export const ShoppingTable: FunctionComponent = () => {
  const { values } = useFormikContext();

  return (
    <Table columns={columnList} data={propOr([], 'ingredients', values)} />
  );
};
