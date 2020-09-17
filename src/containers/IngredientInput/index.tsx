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
import { When } from '@project/components/atoms/When';
import { Textarea } from '@project/components/molecules/Textarea';
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
      .then(getMeta)
      .then(onChange as any);
  }

  return (
    <Fragment>
      <Textarea
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
            <li>name: {value.name}</li>
            <li>amount: {value.amount}</li>
            <li>unit: {value.unit}</li>
            <li>calories: {value.calories}</li>
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
