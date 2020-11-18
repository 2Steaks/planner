/** @format */

import * as R from 'ramda';

export const getRecords = R.pathOr([], ['allRecipes', 'data']);
