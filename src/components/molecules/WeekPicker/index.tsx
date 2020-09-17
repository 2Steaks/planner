/** @format */

import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { Button } from '@project/components/atoms/Button';
import {
  DatePicker,
  DatePickerVariant
} from '@project/components/atoms/DatePicker';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { Label } from '@project/components/atoms/Label';
import { When } from '@project/components/atoms/When';
import { styles } from './styles';

type stringOrUndefined = string | undefined;

interface WeekPickerProps {
  className?: string;
  label?: string;
  name: string;
  value?: string;
  onChange: (value: string) => void;
}

const Component: FunctionComponent<WeekPickerProps> = ({
  className,
  label,
  name,
  value,
  onChange,
  ...props
}: WeekPickerProps) => {
  const [week, setWeek] = useState<stringOrUndefined>(value);

  function storeValue(event: ChangeEvent<HTMLInputElement>) {
    setWeek(event.target.value);
  }

  function handleChange() {
    onChange(week as string);
  }

  return (
    <div className={className}>
      <When condition={Boolean(label)}>
        <Label htmlFor={name}>Choose a week</Label>
      </When>
      <Flex spacing={0}>
        <FlexColumn grow={1}>
          <DatePicker
            name={name}
            type={DatePickerVariant.WEEK}
            value={week}
            onChange={storeValue}
            {...props}
          />
        </FlexColumn>
        <FlexColumn>
          <Button onClick={handleChange}>Go</Button>
        </FlexColumn>
      </Flex>
    </div>
  );
};

export const WeekPicker = compose(
  withStyle(styles),
  withDisplayName('WeekPicker')
)(Component);
