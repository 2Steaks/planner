/** @format */

import { format } from 'date-fns';
import * as R from 'ramda';
import { getTotalCalories } from '@project/services';

export const getId = R.prop('id');
export const getRecipe = R.prop('recipe');

// getTotalCalories :: (Array) -> Number
export const getCombinedCalories = R.compose(
  R.sum,
  R.map(R.compose(getTotalCalories, R.prop('recipe') as any))
);

// findByDay :: (String) -> Object
export const findByDay = (x: string) => R.find(R.propEq('day', x));

// formatDate :: (Date) -> String
export const formatDate = (x: Date) => format(x, "'Today is a' iiii");

export const getMeal = R.curry((meal, arr) =>
  R.find(R.propEq('meal', meal), arr)
);

export const getMeals = R.curry((day, arr) =>
  R.filter(R.propEq('day', day), arr)
);

export const findRecipeById = R.curry((id, arr) => R.find(getId(id), arr));

export const getRecipes = R.propOr([], 'recipes');

export const getCreateRecord = R.prop('createPlan');

export const getRecord = R.path(['findPlanByDate', 0]);

export const getSchedule = R.pathOr([], ['schedule', 'data']);

export const createInitialValues = R.curry(
  (record = {}, week: string, owner) => ({
    ...record,
    week,
    owner
  })
);
