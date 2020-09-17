/** @format */

import * as R from 'ramda';

export const findByValue = (value: string, xs: any[]) =>
  R.find(R.propEq('value', value), xs);
