/** @format */
import React, {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useState
} from 'react';
import { compose } from 'ramda';
import { FormikFieldType } from '@project/types';
import { getTargetValue } from '@project/services';
import { withField } from '@project/helpers/withField';
import { withLogging } from '@project/helpers/withLogging';
import { withMappedProps } from '@project/helpers/withMappedProps';
import { withDisplayName } from '@project/helpers/withDisplayName';
import { Input } from '@project/components/molecules/Input';
import { List, ListItem } from '@project/components/molecules/List';
import { When } from '@project/components/atoms/When';
import { fetchIngredientMeta, getMeta } from './model';

export interface IngredientInputProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  name: string;
  onBlur: (event: ChangeEvent<HTMLTextAreaElement>, x: boolean) => void;
  onChange: (x: string) => void;
  readOnly?: boolean;
  value?: any;
}

const Component: FunctionComponent<IngredientInputProps> = ({
  onBlur,
  onChange,
  readOnly,
  value,
  ...props
}: IngredientInputProps) => {
  const [valueState, setValueState] = useState(value.original);
  const hasMeta = true;
  const handleChange = compose(setValueState, getTargetValue);

  function handleBlur(event: ChangeEvent<HTMLTextAreaElement>) {
    onBlur(event, true);
    fetchIngredientMeta(getTargetValue(event))
      .then(getMeta(getTargetValue(event)))
      .then(onChange as any);
  }

  return (
    <Fragment>
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        readOnly={readOnly}
        value={valueState}
        {...props}
      />
      <When condition={!readOnly}>
        <div>
          <When condition={!hasMeta}>
            <p>Awaiting metadata</p>
          </When>
          <When condition={hasMeta}>
            <List spacing={0}>
              <ListItem>name: {value.name}</ListItem>
              <ListItem>amount: {value.amount}</ListItem>
              <ListItem>unit: {value.unit}</ListItem>
              <ListItem>calories: {value.calories}</ListItem>
            </List>
          </When>
        </div>
      </When>
    </Fragment>
  );
};

const computed = (props: FormikFieldType & IngredientInputProps) => ({
  ...props,
  onChange: props.setValue
});

export const IngredientInput: FunctionComponent<any> = compose(
  withField,
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('IngredientInput')
)(Component);
