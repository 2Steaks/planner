/** @format */

import React, { ChangeEvent, FunctionComponent } from 'react';
import { Label, Slider, Span } from './styles';

export interface SwitchProps {
  checked?: boolean;
  label?: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Switch: FunctionComponent<SwitchProps> = ({
  label,
  name,
  ...props
}: SwitchProps) => {
  return (
    <div>
      <Span>{label}</Span>
      <Label htmlFor={name}>
        <input type="checkbox" id={name} {...props} />
        <Slider />
      </Label>
    </div>
  );
};
