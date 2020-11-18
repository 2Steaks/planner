/** @format */

import { endOfWeek, format, startOfWeek } from 'date-fns';
import * as R from 'ramda';
import { getDateFromWeek, viewOr, getTotalCalories } from '@project/services';

const allPlansLens = R.lensProp('allPlansSortedByWeek');
const dataLens = R.lensProp('data');
const beforeLens = R.lensProp('before');
const afterLens = R.lensProp('after');

export const getRecord = viewOr([], R.compose(allPlansLens, dataLens));
export const getPrevPage = R.view(R.compose(allPlansLens, beforeLens) as any);
export const getNextPage = R.view(R.compose(allPlansLens, afterLens) as any);

export const getPrettyDate = (x: string) =>
  format(startOfWeek(getDateFromWeek(x)), 'd MMM Y') +
  ' - ' +
  format(endOfWeek(getDateFromWeek(x)), 'd MMM Y');

export const getPageLimitOptions = R.map((value) => ({
  label: R.toString(value),
  value
}));

const combineCalories: any = (prev: any) =>
  R.compose(
    R.add(R.defaultTo(0, R.prop('calories', prev))),
    getTotalCalories,
    R.prop('recipe') as any
  );

const createDay = (prev: any, next: any) => ({
  ...prev,
  day: R.prop('day', next),
  calories: combineCalories(prev)(next),
  [R.toLower(next.meal)]: R.path(['recipe', 'title'], next)
});

// want array not object
export const getSchedule = R.compose(
  R.values,
  R.map(R.reduce(createDay, {})),
  R.groupBy(R.prop('day') as any) as any,
  R.view(dataLens)
);

export const columnList = [
  {
    accessor: 'day',
    Header: 'Day'
  },
  {
    accessor: 'breakfast',
    Header: 'Breakfast'
  },
  {
    accessor: 'lunch',
    Header: 'Lunch'
  },
  {
    accessor: 'dinner',
    Header: 'Dinner'
  },
  {
    accessor: 'calories',
    Header: 'Calories'
  }
];
