/** @format */

import * as R from 'ramda';

export const viewOr = R.curry((def, lens, value) =>
  R.defaultTo(def, R.view(lens, value))
);
