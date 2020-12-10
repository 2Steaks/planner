/** @format */

import * as R from 'ramda';

export const getSearchRecipes = R.pathOr([], ['searchRecipe', 'data']);
export const getTagRecipes = R.pathOr([], ['findTagByName', 'recipes', 'data']);
