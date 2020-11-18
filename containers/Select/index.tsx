/** @format */

import { compose } from 'ramda';
import { FormikFieldType } from '@project/types';
import { withField } from '@project/helpers/withField';
import { withLogging } from '@project/helpers/withLogging';
import { withMappedProps } from '@project/helpers/withMappedProps';
import { withDisplayName } from '@project/helpers/withDisplayName';
import {
  Select as Component,
  SelectProps
} from '@project/components/organisms/Select';

const computed = (props: FormikFieldType & SelectProps) => ({
  ...props,
  onChange: props.setValue
});

export const Select = compose(
  withField,
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('Select')
)(Component);
