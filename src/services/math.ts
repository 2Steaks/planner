/** @format */

import * as R from 'ramda';
import { isNumber } from '@project/services/predicates';

export const sumBy = (fn: (x: any) => number) => R.compose(R.sum, R.map(fn));

export const getCaloriesDividedByServing = R.curry(
  (serving = 1, ingredients = []) =>
    R.compose(
      Math.floor,
      R.divide(R.__, serving),
      sumBy(R.propOr(0, 'calories'))
    )(ingredients)
);

export const getTotalCalories = R.converge(getCaloriesDividedByServing, [
  R.propOr(1, 'serving'),
  R.propOr([], 'ingredients')
]);

export const subtractUnlessZero = R.compose(
  R.unless(R.lt(0), R.always(0)),
  R.subtract as any
);

export const toNumber = R.ifElse(isNumber, R.identity, R.always(0));
