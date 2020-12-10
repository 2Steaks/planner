/** @format */

import * as R from 'ramda';
import * as Yup from 'yup';

type getInitialValuesType = (obj: any) => any;
export const getInitialValues: getInitialValuesType = R.evolve({
  id: R.defaultTo(''),
  serving: R.defaultTo('')
});

export const schema = Yup.object().shape({
  id: Yup.string().required('Required'),
  serving: Yup.number().required('Required')
});

export const getId = R.prop('id');
export const getRecipe = R.prop('recipe');

export const getMeal = R.curry((meal, arr) =>
  R.find(R.propEq('meal', meal), arr)
);

export const getMeals = R.curry((day, arr) =>
  R.filter(R.propEq('day', day), arr)
);
