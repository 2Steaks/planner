/** @format */

import absoluteUrl from 'next-absolute-url';
import { NextPageContext } from 'next';
import Axios from 'axios';
import * as R from 'ramda';
import { DaysOfTheWeek, MealsOfTheDay, UserType } from '@project/types';
import { SessionProps } from '@project/context/auth';
import { getMagicGuest, subtractUnlessZero, toNumber } from '@project/services';

const getRequiredAmount = R.converge(subtractUnlessZero, [
  R.compose(toNumber, Number, R.prop('amount')),
  R.compose(toNumber, Number, R.prop('stock'))
]);

const assocRequired = R.chain(R.assoc('required'), getRequiredAmount);
const mapRequiredAmount = R.map(assocRequired);
const filterIngredients = R.reject(R.propEq('required', 0)) as any;
const buildIngredients = R.compose(filterIngredients, mapRequiredAmount);

/**
 *
 * @param email
 * @param ingredients
 */
export const sendShoppingList = (email: string, ingredients: any[]) => {
  return Axios.post('/api/email/shopping', {
    email,
    ingredients: buildIngredients(ingredients)
  }).then((res) => res.data);
};

const findByDay = (order: string[]) => (obj: any) => {
  return R.findIndex(R.equals(obj.day), order);
};

const findByMeal = (order: string[]) => (obj: any) => {
  return R.findIndex(R.equals(obj.meal), order);
};

const sortByDayAndMeal = R.sortWith([
  R.ascend(findByDay(DaysOfTheWeek)),
  R.ascend(findByMeal(MealsOfTheDay))
]);

const transformDays = (acc: any, next: any) => ({
  day: next.day,
  meals: R.append(R.omit(['day'], next), R.defaultTo([], R.prop('meals', acc)))
});

const buildPlan = R.compose(
  R.map(R.reduce(transformDays, {} as any) as any) as any,
  R.values,
  R.groupBy(R.prop('day')),
  sortByDayAndMeal,
  R.path(['schedule', 'data']) as any
);

/**
 *
 * @param email
 * @param ingredients
 */
export const sendMealPlan = (user: UserType, plan: any) => {
  return Axios.post('/api/email/plan-weekly', {
    email: R.prop('email', user),
    plan: buildPlan(plan)
  }).then((res) => res.data);
};

/**
 *
 * @param values
 */
export const userCheckEmail = async (email: string) => {
  return Axios.post('/api/auth/check', { email }).then((res) => res.data);
};

/**
 *
 * @param values
 */
export const userSignup = async (values: {
  email: string;
}): Promise<SessionProps> => {
  await userCheckEmail(R.prop('email', values));
  const magic = getMagicGuest();
  const DIDT = await magic.auth.loginWithMagicLink(R.pick(['email'], values));

  return Axios.post('/api/auth/signup', values, {
    headers: {
      Authorization: 'Bearer ' + DIDT
    }
  }).then((res) => res.data);
};

/**
 *
 * @param values
 */
export const userLogin = async (values: {
  email: string;
}): Promise<SessionProps> => {
  const magic = getMagicGuest();
  const isLoggedIn = await magic.user.isLoggedIn();

  const DIDT = isLoggedIn
    ? await magic.user.getIdToken()
    : await magic.auth.loginWithMagicLink(R.pick(['email'], values));

  return Axios.post('/api/auth/login', values, {
    headers: {
      Authorization: 'Bearer ' + DIDT
    }
  }).then((res) => res.data);
};

/**
 *
 */
export const userLogout = () => {
  return Axios.post('/api/auth/logout').then((res) => res.data);
};

export const uploadImage = (formData: any) =>
  Axios.post('/api/file/upload', formData)
    .then((response) => response.data)
    .then((data) => data.secure_url);

/**
 *
 */
const getCookieHeader: any = R.compose(
  R.pick(['cookie']),
  R.prop('headers') as any
);

/**
 *
 * @param req
 */
export const getSession = async (ctx: NextPageContext) => {
  const { origin } = absoluteUrl(ctx.req);

  try {
    const response = await Axios.get(`${origin}/api/auth/user`, {
      headers: getCookieHeader(ctx.req)
    });

    return response.data;
  } catch (error) {
    return;
  }
};
