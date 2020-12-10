/** @format */

import * as R from 'ramda';
import { viewOr } from '@project/services';

const searchRecipeLens = R.lensProp('searchRecipe');
const dataLens = R.lensProp('data');
const beforeLens = R.lensProp('before');
const afterLens = R.lensProp('after');

export const getRecipes = viewOr([], R.compose(searchRecipeLens, dataLens));
export const getPrevPage = R.view<any, string>(
  R.compose(searchRecipeLens, beforeLens) as any
);
export const getNextPage = R.view<any, string>(
  R.compose(searchRecipeLens, afterLens) as any
);

export const getPageLimitOptions = R.map((value) => ({
  label: R.toString(value),
  value
}));
