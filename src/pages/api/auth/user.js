/** @format */

import Iron from '@hapi/iron';
import {
  getClient,
  getTokenCookie,
  getFaunaIdentity,
  magicAdmin,
  removeTokenCookie
} from '@project/services';

export default async function user(req, res) {
  let cookie;

  const token = getTokenCookie(req);

  if (!token) {
    res.status(401).end();
    return;
  }

  try {
    cookie = await Iron.unseal(
      token,
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (error) {
    res.status(401).end();
    return;
  }

  if (!cookie || !cookie.token) {
    res.status(401).end();
    return;
  }

  try {
    console.log(cookie.token);
    const { ref, data } = await getClient(cookie.token).query(getFaunaIdentity);

    res.status(200).json({ id: ref.id, ...data });
  } catch (error) {
    removeTokenCookie(res);
    magicAdmin.users.logoutByIssuer(cookie.issuer);
    res.status(error.requestResult.statusCode).send(error.message);
  }
}
