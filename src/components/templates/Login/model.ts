/** @format */

import * as Yup from 'yup';

export const initialValues = {
  email: ''
};

export const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required')
});
