/** @format */

import React, {
  ReactNode,
  FunctionComponent,
  createContext,
  useContext
} from 'react';
import { compose, equals } from 'ramda';
import { withDisplayName, withStyle, withLogging } from '@project/helpers';
import { Button, ButtonVariant } from '@project/components/atoms/Button';
import {
  Flex,
  FlexColumn,
  FlexJustifyContent
} from '@project/components/atoms/Flex';
import { PlusIcon, TrashIcon } from '@project/components/atoms/Icon';
import { When } from '@project/components/atoms/When';
import { Row, RowContent, RowActions, styles } from './styles';

type SchemaType = any;

export interface RepeaterContextProps {
  component: (props: any) => ReactNode | ReactNode[];
  isDisabled: boolean;
  isLast: (x: number) => boolean;
  onAdd: (index: number, schema?: SchemaType) => void;
  onChange: (index: number) => (value: any) => void;
  onRemove: (index: number) => void;
}

export interface RepeaterProps {
  children: (props: any) => ReactNode | ReactNode[];
  className: string;
  isDisabled?: boolean;
  onAdd: (index: number, schema?: SchemaType) => void;
  onChange: (index: number) => (value: any) => void;
  onMove: (props: any) => void;
  onRemove: (index: number) => void;
  schema?: SchemaType;
  type?: string;
  value?: any;
}

export interface RepeaterRowProps {
  index: number;
  value: any;
}

const Context = createContext<Partial<RepeaterContextProps>>({});

const Item: FunctionComponent<RepeaterRowProps> = ({
  index,
  ...props
}: RepeaterRowProps) => {
  const { component, isDisabled, onChange, onAdd, onRemove } = useContext(
    Context
  ) as RepeaterContextProps;

  return (
    <Row>
      <RowContent>{component({ ...props, index, onChange })}</RowContent>
      <RowActions>
        <Flex justifyContent={FlexJustifyContent.FLEX_END}>
          <When condition={!isDisabled}>
            <FlexColumn>
              <Button onClick={onAdd(index)} variant={ButtonVariant.INFO}>
                <PlusIcon />
              </Button>
            </FlexColumn>
            <FlexColumn>
              <Button onClick={onRemove(index)} variant={ButtonVariant.WARNING}>
                <TrashIcon />
              </Button>
            </FlexColumn>
          </When>
        </Flex>
      </RowActions>
    </Row>
  );
};

const Component: FunctionComponent<RepeaterProps> = ({
  children,
  className,
  isDisabled,
  onAdd,
  onChange,
  onMove,
  onRemove,
  schema = {},
  value = [],
  ...props
}: RepeaterProps) => {
  const context = {
    component: children,
    isDisabled,
    isLast: equals(value.length),
    onAdd: handleInsert,
    onChange,
    onMove: console.log,
    onRemove: handleRemove
  };

  function handleAdd() {
    onAdd(0, schema);
  }

  function handleInsert(index: number) {
    return function () {
      onAdd(index + 1, schema);
    };
  }

  function handleRemove(index: number) {
    return function () {
      onRemove(index);
    };
  }

  return (
    <Context.Provider value={context}>
      <div className={className}>
        {value.map((value: any, i: number) => (
          <Item
            key={JSON.stringify(value)}
            index={i}
            value={value}
            {...props}
          />
        ))}

        <When condition={!isDisabled && !value.length}>
          <Button onClick={handleAdd}>Add</Button>
        </When>
      </div>
    </Context.Provider>
  );
};

export const Repeater = compose(
  withStyle(styles, ['isDisabled']),
  withLogging(false),
  withDisplayName('Repeater')
)(Component);
