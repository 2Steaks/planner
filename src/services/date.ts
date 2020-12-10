/** @format */

import { NextPageContext } from 'next';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import * as R from 'ramda';

const addHiphen = R.curry((a, b) => `${a}-${b}`);

export const getWeekFromDate = (x: Date) => format(x, "Y-'W'w");

export const getDateFromWeek = (x: string) => {
  const arr = x.split('-');
  const week = parseInt(arr[1].replace('W', ''));
  const year = parseInt(arr[0]);
  const day = 1 + (week - 1) * 7;

  return new Date(year, 0, day);
};

type getWeekFromRouteType = (obj: NextPageContext) => string;
export const getWeekFromRoute: getWeekFromRouteType = R.compose(
  R.converge(addHiphen, [R.prop('year'), R.prop('week')]),
  R.prop('query')
);

export const getStartAndEndDateFromWeek = (x: string) =>
  format(
    startOfWeek(getDateFromWeek(x), {
      locale: { code: 'en-GB' },
      weekStartsOn: 1
    }),
    'd MMM Y'
  ) +
  ' - ' +
  format(
    endOfWeek(getDateFromWeek(x), {
      locale: { code: 'en-GB' },
      weekStartsOn: 1
    }),
    'd MMM Y'
  );
