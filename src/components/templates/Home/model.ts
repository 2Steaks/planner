/** @format */

import * as R from 'ramda';

export const getTagRecipes = R.pathOr([], ['findTagByName', 'recipes', 'data']);
