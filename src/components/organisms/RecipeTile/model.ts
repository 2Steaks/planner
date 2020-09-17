/** @format */

import * as R from 'ramda';
import * as Yup from 'yup';

type getInitialValuesType = (obj: any) => any;
export const getInitialValues: getInitialValuesType = R.evolve({
  id: R.defaultTo('')
});

export const schema = Yup.object({
  id: Yup.string().required('Required')
});
