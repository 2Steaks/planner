/** @format */

import * as R from 'ramda';
import { createOption } from '@project/services';

export const createOptions: any = R.map(
  createOption({ value: 'id', label: 'name' })
);

export const getSuggestions: any = R.compose(
  createOptions,
  R.pathOr([], ['allTags', 'data'])
);

export const differenceToId = (arrA: any[], arrB: any[]) =>
  R.compose<any[], any[], any[]>(R.map(R.prop('id')), R.difference(arrB))(arrA);
