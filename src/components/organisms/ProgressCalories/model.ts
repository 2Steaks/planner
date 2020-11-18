/** @format */

import * as R from 'ramda';
import { colors } from '@project/theme';

export const getCalorieColor = R.cond([
  [R.gt(R.__, 90), R.always(colors.red)],
  [R.gt(R.__, 80), R.always(colors.orange)],
  [R.T, R.always(colors.green)]
]) as any;
