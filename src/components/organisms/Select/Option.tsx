/** @format */
import React, { FunctionComponent, MouseEvent, useContext } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { compose, includes } from 'ramda';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { colors, gutter } from '@project/theme';
import { setValue } from './model';
import { Context, SelectContextProps } from './Select';

export interface OptionProps {
  label: any;
  onChange: (event: MouseEvent<HTMLOptionElement>) => void;
  selected?: boolean;
  setIsMenuVisible: (x: boolean) => void;
  value?: any;
}

const Component: FunctionComponent<OptionProps> = ({
  label,
  value,
  ...props
}: OptionProps) => {
  const {
    multiple,
    onChange,
    setIsFocused,
    setSearchTerm,
    values
  } = useContext(Context) as SelectContextProps;

  const isDisabled = includes(value);

  function handleChange() {
    onChange(setValue(multiple, { value, label })(values));
    setIsFocused(false);
    setSearchTerm('');
  }

  return (
    <option disabled={isDisabled(values)} onClick={handleChange} {...props}>
      {label}
    </option>
  );
};

export const style = (): SerializedStyles => css`
  &:hover {
    background-color: ${colors.slate100};
  }

  padding: ${gutter};
  cursor: pointer;
`;

export const Option = compose(
  withStyle(style),
  withLogging(false),
  withDisplayName('Option')
)(Component);
