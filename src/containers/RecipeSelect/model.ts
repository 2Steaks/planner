/** @format */

import * as R from 'ramda';
import { createOption } from '@project/services';

export const getRecord = R.pathOr([], ['allRecipes', 'data']);

export const toSelectOptions = R.map(
  createOption({ value: 'id', label: 'title' })
);
