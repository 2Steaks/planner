/** @format */

import Iron from '@hapi/iron';
import Axios from 'axios';
import {
  getTokenCookie,
  magicAdmin,
  removeTokenCookie
} from '@project/services';

export default async (req, res) => {
  const encryptedToken = getTokenCookie(req);
  let cookie;

  if (encryptedToken) {
    try {
      cookie = await Iron.unseal(
        encryptedToken,
        process.env.ENCRYPTION_SECRET,
        Iron.defaults
      );
    } catch (error) {
      console.error(error);
      res.status(401).end();
    }
  }

  try {
    const response = await Axios.post(
      'https://graphql.fauna.com/graphql',
      req.body,
      {
        headers: {
          authorization: `Bearer ${
            cookie?.token || process.env.NEXT_PUBLIC_FAUNA_GUEST_SECRET
          }`,
          'X-Schema-Preview': 'partial-update-mutation'
        }
      }
    );

    if (response.data.errors) {
      throw response;
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);

    cookie && magicAdmin.users.logoutByIssuer(cookie.issuer);
    removeTokenCookie(res);
    res.status(401).json(error.data.errors);
  }
};
