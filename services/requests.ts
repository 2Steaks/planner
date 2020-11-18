/** @format */

import { IncomingMessage } from 'http';
import Axios from 'axios';
import { Magic } from 'magic-sdk';
import * as R from 'ramda';
import { SessionProps } from '@project/context/auth';

/**
 *
 * @param email
 * @param ingredients
 */
export const sendShoppingList = (email: string, ingredients: any[]) => {
  return Axios.post('/api/email', {
    email,
    ingredients
  }).then((res) => res.data);
};

/**
 *
 * @param values
 */
export const userSignup = async (values: {
  email: string;
}): Promise<SessionProps> => {
  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY as string);
  const DIDT = await magic.auth.loginWithMagicLink(R.pick(['email'], values));

  return Axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
    values,
    {
      headers: {
        Authorization: 'Bearer ' + DIDT
      }
    }
  ).then((res) => res.data);
};

/**
 *
 * @param values
 */
export const userLogin = async (values: {
  email: string;
}): Promise<SessionProps> => {
  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY as string);
  const isLoggedIn = await magic.user.isLoggedIn();

  const DIDT = isLoggedIn
    ? await magic.user.getIdToken()
    : await magic.auth.loginWithMagicLink(R.pick(['email'], values));

  return Axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
    values,
    {
      headers: {
        Authorization: 'Bearer ' + DIDT
      }
    }
  ).then((res) => res.data);
};

/**
 *
 */
export const userLogout = () => {
  return Axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`).then(
    (res) => res.data
  );
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
export const getSession = async (req: IncomingMessage) => {
  try {
    const response = await Axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`,
      {
        headers: getCookieHeader(req)
      }
    );

    return response.data;
  } catch (error) {
    return;
  }
};
