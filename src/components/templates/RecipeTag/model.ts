/** @format */

import * as R from 'ramda';
import { viewOr } from '@project/services';

const tagByName = R.lensProp('findTagByName');
const recipesLens = R.lensProp('recipes');
const dataLens = R.lensProp('data');
const beforeLens = R.lensProp('before');
const afterLens = R.lensProp('after');

const lensToRecipes = R.compose(tagByName, recipesLens);
export const getRecipes = viewOr([], R.compose(lensToRecipes, dataLens));
export const getPrevPage = R.view(R.compose(lensToRecipes, beforeLens) as any);
export const getNextPage = R.view(R.compose(lensToRecipes, afterLens) as any);
