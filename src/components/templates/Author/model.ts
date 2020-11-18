/** @format */

import * as R from 'ramda';
import { viewOr } from '@project/services';

const userByIdentity = R.lensProp('findUserByID');
const recipesLens = R.lensProp('recipes');
const dataLens = R.lensProp('data');
const beforeLens = R.lensProp('before');
const afterLens = R.lensProp('after');

const lensToRecipes = R.compose(userByIdentity, recipesLens);
export const getRecord = R.view(userByIdentity) as any;
export const getRecipes = viewOr([], R.compose(lensToRecipes, dataLens));
export const getPrevPage = R.view(R.compose(lensToRecipes, beforeLens) as any);
export const getNextPage = R.view(R.compose(lensToRecipes, afterLens) as any);
