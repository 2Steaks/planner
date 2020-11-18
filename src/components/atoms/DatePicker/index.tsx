/** @format */

import React, { ChangeEvent, FunctionComponent, Ref } from 'react';
import { compose } from 'ramda';
import {
  withDisplayName,
  withStyle,
  withLogging,
  withRef
} from '@project/helpers';
import { styles } from './styles';

export enum DatePickerVariant {
  DATE = 'date',
  WEEK = 'week'
}

export interface DatePickerProps {
  className?: string;
  forwardRef?: Ref<HTMLInputElement>;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  type?: DatePickerVariant;
  value?: any;
}

const Component: FunctionComponent<DatePickerProps> = ({
  forwardRef,
  type = DatePickerVariant.DATE,
  ...props
}: DatePickerProps) => {
  return <input ref={forwardRef} type={type} {...props} />;
};

export const DatePicker = compose(
  withStyle(styles, []),
  withLogging(false),
  withDisplayName('DatePicker'),
  withRef
)(Component);
