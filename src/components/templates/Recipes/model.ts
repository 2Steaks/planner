/** @format */

import * as R from 'ramda';
import { hasIntersection } from '@project/services';

// hasTags :: (Array) -> Object -> Boolean
export const hasTags = (tags: string[]): any =>
  R.compose(hasIntersection(tags), R.prop('tags'));

// filterByTags :: (Array) -> Array
export const filterByTags = (tags: string[]) => R.filter(hasTags(tags));

export const getRecords = R.pathOr([], ['allRecipes', 'data']);
