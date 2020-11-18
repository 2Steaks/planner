/** @format */

import { query as q } from 'faunadb';
import Iron from '@hapi/iron';
import {
  getClient,
  magicAdmin,
  getTokenCookie,
  removeTokenCookie
} from '@project/services';

export default async function logout(req, res) {
  let cookie;

  try {
    cookie = await Iron.unseal(
      getTokenCookie(req),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (error) {
    res.status(401).end();
  }

  if (!cookie || !cookie.token) {
    return res.status(401).send('Auth cookie not found');
  }

  try {
    const faunaLogout = getClient(cookie.token).query(q.Logout(true));
    const magicLogout = magicAdmin.users.logoutByIssuer(cookie.issuer);
    await Promise.all([faunaLogout, magicLogout]);

    removeTokenCookie(res);

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(error.requestResult.statusCode).send(error.message);
  }
}
