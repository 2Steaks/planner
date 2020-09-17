/** @format */

import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  FormikProps
} from 'formik';

export type FormikFieldType = FieldHelperProps<any> &
  FieldInputProps<any> &
  FieldMetaProps<any> &
  FormikProps<any>;
