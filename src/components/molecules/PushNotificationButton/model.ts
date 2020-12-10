/** @format */

import * as R from 'ramda';

export const isAwaitingPermission = R.compose(
  R.not,
  R.equals('prompt'),
  R.prop('state') as any
);
