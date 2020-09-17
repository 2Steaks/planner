/** @format */

import * as Yup from 'yup';

export const initialValues = {
  firstName: '',
  lastName: '',
  email: ''
};

export const schema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required')
});
