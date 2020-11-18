/** @format */

import Iron from '@hapi/iron';
import Axios from 'axios';
import { getTokenCookie } from '@project/services/cookies';

export default async (req, res) => {
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

  try {
    const response = await Axios.post(
      'https://graphql.fauna.com/graphql',
      req.body,
      {
        headers: {
          authorization: cookie ? `Bearer ${cookie.token}` : '',
          'X-Schema-Preview': 'partial-update-mutation'
        }
      }
    );

    res.statusCode = 200;
    res.json(response.data);
  } catch (error) {
    console.error(error);

    if (error.response) {
      res.statusCode = error.response.status;
      res.json(error);
    }
  }
};
