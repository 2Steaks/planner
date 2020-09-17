/** @format */

import Axios from 'axios';
import * as R from 'ramda';
import { option, safeProp } from '@project/services';

const getUnitCalAmount = R.compose(
  option(0),
  R.map(R.prop('amount')) as any,
  R.map(R.find(R.propEq('unit', 'kcal'))),
  safeProp('nutrients') as any
);

const getCalories = R.compose(getUnitCalAmount, R.prop('nutrition'));

const createMetaObject = (value: any) => ({
  amount: value.amount,
  calories: getCalories(value),
  original: value.original,
  name: value.name,
  unit: value.unit
});

export const getMeta = R.compose(createMetaObject, R.path(['data', 0]));

export const fetchIngredientMeta = R.compose(
  Axios.get,
  R.concat('/api/nutrition/metadata?query=')
);
