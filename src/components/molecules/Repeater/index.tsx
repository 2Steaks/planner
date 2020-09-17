/** @format */

import React, {
  ReactNode,
  FunctionComponent,
  createContext,
  useContext
} from 'react';
import { compose, equals } from 'ramda';
import { withDisplayName, withStyle, withLogging } from '@project/helpers';
import { Button } from '@project/components/atoms/Button';
import { PlusIcon, TrashIcon } from '@project/components/atoms/Icon';
import { When } from '@project/components/atoms/When';
import { ColumnLeft, ColumnRight, Row, styles } from './styles';

type SchemaType = any;

export interface RepeaterContextProps {
  component: (props: any) => ReactNode | ReactNode[];
  isDisabled: boolean;
  isLast: (x: number) => boolean;
  onChange: (index: number) => (value: any) => void;
  onInsert: (index: number, schema?: SchemaType) => void;
  onRemove: (index: number) => void;
}

export interface RepeaterProps {
  children: (props: any) => ReactNode | ReactNode[];
  className: string;
  isDisabled?: boolean;
  onAdd: (props: any) => void;
  onChange: (index: number) => (value: any) => void;
  onInsert: (index: number, schema?: SchemaType) => void;
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
  const { component, isDisabled, onChange, onInsert, onRemove } = useContext(
    Context
  ) as RepeaterContextProps;

  return (
    <Row>
      <ColumnLeft>
        {component({ ...props, index, onChange: onChange(index) })}
      </ColumnLeft>
      <ColumnRight>
        <When condition={!isDisabled}>
          <Button onClick={onInsert(index)}>
            <PlusIcon />
          </Button>
          <Button onClick={onRemove(index)}>
            <TrashIcon />
          </Button>
        </When>
      </ColumnRight>
    </Row>
  );
};

const Component: FunctionComponent<RepeaterProps> = ({
  children,
  className,
  isDisabled,
  onAdd,
  onChange,
  onInsert,
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
    onAdd: handleAdd,
    onChange,
    onInsert: handleInsert,
    onMove: console.log,
    onRemove: handleRemove
  };

  function handleAdd() {
    onAdd(schema);
  }

  function handleInsert(index: number) {
    return function () {
      onInsert(index + 1, schema);
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
        {value.map((val: any, i: number) => (
          <Item key={i} index={i} value={val} {...props} />
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
