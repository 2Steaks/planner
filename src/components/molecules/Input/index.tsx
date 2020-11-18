/** @format */

import React, { ChangeEvent, FunctionComponent, Ref } from 'react';
import { compose, defaultTo, evolve } from 'ramda';
import {
  withDisplayName,
  withLogging,
  withMappedProps,
  withRef,
  withStyle
} from '@project/helpers';
import { Label } from '@project/components/atoms/Label';
import { When } from '@project/components/atoms/When';
import { styles } from './styles';

export enum InputVariant {
  STANDARD = 'STANDARD',
  NONE = 'NONE'
}

export enum InputType {
  CHECKBOX = 'checkbox',
  EMAIL = 'email',
  FILE = 'file',
  NUMBER = 'number',
  RADIO = 'radio',
  RANGE = 'range',
  TEXT = 'text'
}

export interface InputProps {
  autoComplete?: 'on' | 'off';
  className?: string;
  disabled?: boolean;
  forwardRef?: Ref<HTMLInputElement>;
  label?: string;
  min?: number;
  max?: number;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  type?: string;
  value?: any;
}

const Component: FunctionComponent<InputProps> = ({
  className,
  label,
  forwardRef,
  name,
  readOnly = false,
  type = InputType.TEXT,
  value = '',
  ...props
}: InputProps) => {
  return (
    <div className={className}>
      <When condition={Boolean(label)}>
        <Label htmlFor={name}>{label}</Label>
      </When>
      <input
        readOnly={readOnly}
        type={type}
        value={value}
        ref={forwardRef}
        {...props}
      />
    </div>
  );
};

const computed: any = evolve({ value: defaultTo('') });

export const Input = compose(
  withStyle(compose(styles, computed)),
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('Input'),
  withRef
)(Component);
