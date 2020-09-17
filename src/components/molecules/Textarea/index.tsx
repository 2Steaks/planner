/** @format */

import React, {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  Ref,
  useRef,
  useState
} from 'react';
import { compose, equals, evolve, defaultTo } from 'ramda';
import {
  withDisplayName,
  withMappedProps,
  withStyle,
  withLogging,
  withRef
} from '@project/helpers';
import { useEnhancedEffect, useForkRef } from '@project/hooks';
import { Label } from '@project/components/atoms/Label';
import { When } from '@project/components/atoms/When';
import { styles } from './styles';
import { calcScrollHeight, getRows, getScrollHeight } from './model';

export interface TextareaProps {
  className?: string;
  disabled?: boolean;
  forwardRef?: Ref<HTMLTextAreaElement>;
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  label?: string;
  readOnly?: boolean;
  rows?: number;
  value?: any;
}

const Component: FunctionComponent<TextareaProps> = ({
  className,
  label,
  forwardRef,
  name,
  onChange,
  onFocus,
  readOnly = false,
  rows = 3,
  value,
  ...props
}: TextareaProps) => {
  const [baseScrollHeight, setBaseScrollHeight] = useState<number>(0);
  const [rowState, setRowState] = useState<number>(rows);
  const [valueState, setValueState] = useState<string>(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ref = useForkRef(forwardRef, textareaRef);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setRowState(rows);
    setValueState(event.target.value);
    onChange(event);
  }

  function handleFocus(event: FocusEvent<HTMLTextAreaElement>) {
    setValueState('');
    onFocus && onFocus(event);
  }

  useEnhancedEffect(() => {
    if (equals('', valueState)) {
      setBaseScrollHeight(getScrollHeight(textareaRef));
      setValueState(value);
    }

    if (equals(rows, rowState)) {
      const scrollHeight = calcScrollHeight(
        textareaRef as any,
        baseScrollHeight
      );
      setRowState(getRows(scrollHeight, rows));
    }
  }, [valueState]);

  return (
    <div className={className}>
      <When condition={Boolean(label)}>
        <Label htmlFor={name}>{label}</Label>
      </When>
      <textarea
        id={name}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={ref}
        rows={rowState}
        value={valueState}
        {...props}
      />
    </div>
  );
};

const computed: any = evolve({ value: defaultTo('') });

export const Textarea = compose(
  withStyle(compose(styles, computed)),
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('Textarea'),
  withRef
)(Component);
