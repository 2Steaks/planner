/** @format */

import { add, sub } from 'date-fns/fp';
import * as R from 'ramda';
import { getDateFromWeek, getWeekFromDate } from '@project/services';

export const createInitialValues = R.curry(
  (record = {}, week: string, owner) => ({
    ...record,
    week,
    owner
  })
);

export const getCreateRecord = R.prop('createPlan');

export const getId = R.prop('id');

export const getRecord = R.path(['findPlanByDate', 0]);

export const getSchedule = R.pathOr([], ['schedule', 'data']);

const incByWeekConfig = { weeks: 1 };
const getDateFnIncDecFn = R.ifElse(
  R.gt(R.__, 0),
  R.always(add(incByWeekConfig)),
  R.always(sub(incByWeekConfig))
);

export const incrementWeek = (offset: number) =>
  R.compose(getWeekFromDate, getDateFnIncDecFn(offset), getDateFromWeek);
