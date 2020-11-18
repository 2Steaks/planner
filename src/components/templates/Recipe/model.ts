/** @format */

import * as R from 'ramda';
import * as Yup from 'yup';
import { hasValue } from '@project/services';

const getText = ({
  amount,
  instruction,
  name,
  unit
}: {
  amount: string;
  instruction: string;
  name: string;
  unit: string;
}) => `${name}, ${amount} ${unit} ${instruction}`;

export const getAuthorId = R.path(['author', 'id']);

export const getCreateRecipeId = R.path(['createRecipe', 'id']);

export const getId = R.prop('id');

export const getImage = R.prop('image');

export const getInitialValues = R.evolve({
  title: R.defaultTo(''),
  recipes: R.pluck('id')
});

export const getIngredient = (index: number): any =>
  R.pathOr({}, ['ingredients', index]);

export const getRelatedRecipes = R.pathOr([], ['recipes']);

export const getIngredientText = (index: number) =>
  R.compose(getText, getIngredient(index));

export const getRecord = R.propOr({ title: '' }, 'findRecipeByID');

export const getTags = R.pathOr([], ['tags', 'data']);

export const hasBeenScheduled = R.compose(
  hasValue,
  R.path(['schedule', 'data'])
);

export const schema = Yup.object({
  title: Yup.string().required('Required')
});
