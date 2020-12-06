/** @format */

import * as Yup from 'yup';

export const schema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  calories: Yup.number().required('Required')
});
