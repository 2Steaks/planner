/** @format */

import Axios from 'axios';
import * as R from 'ramda';

const createMetaObject = (value: any) => (metadata: any) => ({
  amount: metadata.serving_qty,
  calories: metadata.nf_calories,
  original: value,
  name: metadata.food_name,
  unit: metadata.serving_unit
});

export const getMeta = (value: any) =>
  R.compose(createMetaObject(value), R.path(['data', 'foods', 0]));

export const fetchIngredientMeta = R.compose(
  Axios.get,
  R.concat('/api/nutrition/metadata?query=')
);
