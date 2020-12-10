/** @format */

import * as R from 'ramda';
import { Either } from 'monet';
import {
  createShoppingQuery,
  eitherAfter,
  hasValue,
  subtractUnlessZero,
  viewOr
} from '@project/services';

type getScheduleType = (x: any) => any;
const getSchedule: getScheduleType = R.pathOr(
  [],
  ['findPlanByDate', 0, 'schedule', 'data']
);

const mapAmounts = (recipe: any, serving: number) => {
  return recipe.ingredients.map((ingredient: any) => ({
    ...ingredient,
    amount: (ingredient.amount / recipe.serving) * serving
  }));
};

const mapAmountsByServing = R.converge(mapAmounts, [
  R.prop('recipe'),
  R.prop('serving')
]);

const mapIngredients = R.map(mapAmountsByServing);

const defaultToZero = R.defaultTo(0);
const createIngredient = (prev: any, next: any) => ({
  ...next,
  amount: R.add(defaultToZero(next.amount), defaultToZero(prev.amount))
});

const getShopping = R.lensPath(['findShoppingByDate', 0]);
const getId = R.lensProp('id');
const getIngredients = R.lensProp('ingredients');
const getShoppingIngredients = R.compose(getShopping, getIngredients);

export const getColumnValue = (key: string) =>
  R.compose(
    Number,
    R.prop('value'),
    R.find(R.pathEq(['column', 'id'], key)),
    R.pathOr([], ['row', 'cells'])
  );

export const getShoppingId = R.compose(getShopping, getId);
const assocShoppingId = R.compose(
  R.when(R.has('id'), R.view(getId)),
  R.view(getShopping)
);

const viewShoppingIngredients = viewOr([], getShoppingIngredients);

const toValuesAndPickAll = R.compose(
  R.map(R.pickAll(['id', 'amount', 'name', 'stock', 'unit'])),
  R.values as any
);

type compileIngredientsType = (x: any) => any;
const compileIngredients: compileIngredientsType = R.compose(
  toValuesAndPickAll,
  R.map(R.reduce(createIngredient, {})),
  R.groupBy(R.prop('id') as any) as any,
  R.flatten,
  mapIngredients,
  getSchedule
);

export const getRequiredAmount = R.converge(subtractUnlessZero, [
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

const findByIdAndUnit = R.both(R.eqProps('id'), R.eqProps('unit'));

export const mergeIngredients = (shopping: [], ingredients: []) => {
  const planIngredients = compileIngredients(ingredients);

  const shoppingInPlan = R.innerJoin(
    findByIdAndUnit,
    planIngredients,
    viewShoppingIngredients(shopping)
  );

  const upToDateShopping = R.unionWith(
    findByIdAndUnit,
    shoppingInPlan,
    planIngredients
  );

  return upToDateShopping;
};
