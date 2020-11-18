/** @format */

import * as R from 'ramda';

export const isFavourite = R.compose(
  R.equals(true),
  R.prop('isUserFavouriteRecipeById') as any
) as any;
