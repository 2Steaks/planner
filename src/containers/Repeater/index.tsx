/** @format */

import React, { FunctionComponent } from 'react';
import { FieldArray } from 'formik';
import { withField } from '@project/helpers/withField';
import { Repeater as BaseRepeater } from '@project/components/molecules/Repeater';

const Container = ({ children, insert, move, remove, ...props }: any) => {
  function handleChange(index: number) {
    return function (value: any) {
      props.form.setFieldValue(`${props.name}.${index}`, value);
    };
  }

  return (
    <BaseRepeater
      {...props}
      onAdd={insert}
      onMove={move}
      onRemove={remove}
      onChange={handleChange}
    >
      {children}
    </BaseRepeater>
  );
};

const ContainerWithHelpers = (props: any) => {
  function Wrapper(formProps: any) {
    return <Container {...props} {...formProps} />;
  }

  return <FieldArray render={Wrapper} {...props} />;
};

export const Repeater: FunctionComponent<any> = withField(ContainerWithHelpers);
