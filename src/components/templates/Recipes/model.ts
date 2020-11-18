/** @format */

import * as R from 'ramda';
import { viewOr } from '@project/services';

const userByIdentity = R.lensProp('findUserByID');
const favouritesLens = R.lensProp('favourites');
const recipesLens = R.lensProp('recipes');
const dataLens = R.lensProp('data');
const beforeLens = R.lensProp('before');
const afterLens = R.lensProp('after');

export const getMyRecipes = viewOr(
  [],
  R.compose(userByIdentity, recipesLens, dataLens)
);
export const getMyRecipesPrevPage = R.view(
  R.compose(userByIdentity, recipesLens, beforeLens) as any
);
export const getMyRecipesNextPage = R.view(
  R.compose(userByIdentity, recipesLens, afterLens) as any
);

export const getFavouriteRecipes = viewOr(
  [],
  R.compose(userByIdentity, favouritesLens, dataLens)
);
export const getFavouriteRecipesPrevPage = R.view(
  R.compose(userByIdentity, favouritesLens, beforeLens) as any
);
export const getFavouriteRecipesNextPage = R.view(
  R.compose(userByIdentity, favouritesLens, afterLens) as any
);
