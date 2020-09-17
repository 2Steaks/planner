/** @format */

import * as R from 'ramda';
import { safeArray } from './predicates';

// safeIntersection ::
export const safeIntersection = R.curry((x, y) =>
  R.lift(R.intersection, safeArray(x), safeArray(y))
);

// memo ::
export const memo = (fn: (x: any) => any) => R.memoizeWith(R.toString, fn);

export const whenTrue = R.curry((bool, x) =>
  R.when(R.equals(true), R.always(x))(bool)
);
