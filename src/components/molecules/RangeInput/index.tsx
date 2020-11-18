/** @format */

import React, { FunctionComponent, Ref } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle, withRef } from '@project/helpers';
import { styles } from './styles';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { Label } from '@project/components/atoms/Label';
import { When } from '@project/components/atoms/When';
import { Value } from './styles';

export interface RangeInputProps {
  className?: string;
  disabled?: boolean;
  forwardRef?: Ref<HTMLInputElement>;
  label?: string;
  min?: number;
  max?: number;
  name: string;
  value?: string | number;
}

const Component: FunctionComponent<RangeInputProps> = ({
  className,
  forwardRef,
  label,
  name,
  value = 0,
  ...props
}: RangeInputProps) => {
  return (
    <div className={className}>
      <Flex>
        <FlexColumn grow={1}>
          <When condition={Boolean(label)}>
            <Label htmlFor={name}>{label}</Label>
          </When>
        </FlexColumn>
        <FlexColumn>
          <Value>{value}</Value>
        </FlexColumn>
      </Flex>
      <input type="range" value={value} ref={forwardRef} {...props} />
    </div>
  );
};

export const RangeInput = compose(
  withStyle(styles),
  withRef,
  withDisplayName('RangeInput')
)(Component);
