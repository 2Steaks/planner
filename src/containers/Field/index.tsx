/** @format */

import { FunctionComponent } from 'react';
import { withField } from '@project/helpers/withField';
import { DatePicker as BaseDatePicker } from '@project/components/atoms/DatePicker';
import { Switch as BaseSwitch } from '@project/components/atoms/Switch';
import { Input as BaseInput } from '@project/components/molecules/Input';
import { RangeInput as BaseRangeInput } from '@project/components/molecules/RangeInput';
import { Textarea as BaseTextarea } from '@project/components/molecules/Textarea';

export const DatePicker: FunctionComponent<any> = withField(BaseDatePicker);
export const Input: FunctionComponent<any> = withField(BaseInput);
export const RangeInput: FunctionComponent<any> = withField(BaseRangeInput);
export const Switch: FunctionComponent<any> = withField(BaseSwitch, {
  type: 'checkbox'
});
export const Textarea: FunctionComponent<any> = withField(BaseTextarea);
