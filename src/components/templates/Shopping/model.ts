/** @format */

import * as R from 'ramda';
import { Either } from 'monet';
import {
  createShoppingQuery,
  eitherAfter,
  hasValue,
  viewOr
} from '@project/services';

type getRecipesType = (x: any) => any;
const getRecipes: getRecipesType = R.pathOr(
  [],
  ['findPlanByDate', 0, 'schedule', 'data']
);
const mapIngredients = R.map(R.path(['recipe', 'ingredients']));

const defaultToZero = R.defaultTo(0);
const createIngredient = (prev: any, next: any) => ({
  ...next,
  amount: R.add(defaultToZero(next.amount), defaultToZero(prev.amount))
});

const getShopping = R.lensPath(['findShoppingByDate', 0]);
const getId = R.lensProp('id');
const getIngredients = R.lensProp('ingredients');
const getShoppingIngredients = R.compose(getShopping, getIngredients);

export const getShoppingId = R.compose(getShopping, getId);
const assocShoppingId = R.compose(
  R.when(R.has('id'), R.view(getShoppingId as any))
);

const viewShoppingIngredients = viewOr([], getShoppingIngredients);

const subtractUntilZero = R.compose(
  R.unless(R.lt(0), R.always(0)),
  R.subtract as any
);

const toValuesAndPickAll = R.compose(
  R.map(R.pickAll(['amount', 'name', 'stock', 'unit'])),
  R.values as any
);

type compileIngredientsType = (x: any) => any;
const compileIngredients: compileIngredientsType = R.compose(
  toValuesAndPickAll,
  R.map(R.reduce(createIngredient, {})),
  R.groupBy(R.prop('name') as any) as any,
  R.flatten,
  mapIngredients,
  getRecipes
);

export const getRequiredAmount = R.converge(subtractUntilZero, [
  R.pathOr(0, ['row', 'values', 'amount']),
  R.pathOr(0, ['row', 'values', 'stock'])
]);

export const createQuery = R.curry((record, values) =>
  Either.of(values)
    .map(createShoppingQuery)
    .chain(
      eitherAfter(
        R.compose(hasValue, R.prop('id') as any),
        R.mergeLeft(assocShoppingId(record) as any)
      )
    )
);

export const mergeIngredients = (shopping: [], ingredients: []) =>
  R.unionWith(
    R.both(R.eqProps('name'), R.eqProps('unit')),
    viewShoppingIngredients(shopping),
    compileIngredients(ingredients)
  );
