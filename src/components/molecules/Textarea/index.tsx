/** @format */

import React, { ChangeEvent, FocusEvent, FunctionComponent, Ref } from 'react';
import { compose, evolve, defaultTo } from 'ramda';
import {
  withDisplayName,
  withMappedProps,
  withStyle,
  withRef
} from '@project/helpers';
import { Label } from '@project/components/atoms/Label';
import { When } from '@project/components/atoms/When';
import { Clone, styles } from './styles';

export interface TextareaProps {
  className?: string;
  disabled?: boolean;
  forwardRef?: Ref<HTMLTextAreaElement>;
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  label?: string;
  readOnly?: boolean;
  value?: any;
}

const Component: FunctionComponent<TextareaProps> = ({
  className,
  label,
  forwardRef,
  name,
  value,
  ...props
}: TextareaProps) => {
  return (
    <div className={className}>
      <When condition={Boolean(label)}>
        <Label htmlFor={name}>{label}</Label>
      </When>
      <Clone data-value={value}>
        <textarea id={name} ref={forwardRef} {...props}>
          {value}
        </textarea>
      </Clone>
    </div>
  );
};

const computed: any = evolve({ value: defaultTo('') });

export const Textarea = compose(
  withStyle(compose(styles, computed)),
  withMappedProps(computed),
  withDisplayName('Textarea'),
  withRef
)(Component);
