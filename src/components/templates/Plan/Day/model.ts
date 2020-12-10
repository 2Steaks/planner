/** @format */

import * as R from 'ramda';
import { getTotalCalories } from '@project/services';

// getTotalCalories :: (Array) -> Number
export const getCombinedCalories = R.compose(
  R.sum,
  R.map(R.compose(getTotalCalories, R.prop('recipe') as any))
);

export const getMeals = R.curry((day, arr) =>
  R.filter(R.propEq('day', day), arr)
);
