/** @format */

import * as R from 'ramda';

export const sumBy = (fn: (x: any) => number) => R.compose(R.sum, R.map(fn));

export const getCaloriesDividedByServing = R.curry((serving, ingredients) =>
  R.compose(
    Math.floor,
    R.divide(R.__, serving || 1),
    sumBy(R.propOr(0, 'calories'))
  )(ingredients)
);

export const getTotalCalories = R.converge(getCaloriesDividedByServing, [
  R.propOr(1, 'serving'),
  R.propOr([], 'ingredients')
]);
