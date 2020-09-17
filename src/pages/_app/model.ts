/** @format */

import * as R from 'ramda';

export const isProtectedRoute = (x: any) =>
  R.not(R.any(R.equals(x))(['/login', '/signup']));
