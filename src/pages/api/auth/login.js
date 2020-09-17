/** @format */

import Iron from '@hapi/iron';
import {
  faunaAdminClient,
  faunaGuestClient,
  getUserByEmail,
  getFaunaToken,
  magic,
  setTokenCookie
} from '@project/services';

export default async function login(req, res) {
  try {
    const didToken = magic.utils.parseAuthorizationHeader(
      req.headers.authorization
    );

    const magicUser = await magic.users.getMetadataByToken(didToken);
    const faunaUser = await faunaGuestClient.query(
      getUserByEmail(magicUser.email)
    );

    if (!faunaUser) {
      return res.status(400).send('User does not exist');
    }

    const { secret } = await faunaAdminClient.query(getFaunaToken(faunaUser));

    const cookie = {
      email: magicUser.email,
      issuer: magicUser.issuer,
      token: secret
    };

    const encryptedCookie = await Iron.seal(
      cookie,
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );

    setTokenCookie(res, encryptedCookie);

    const { ref, data } = faunaUser;
    res.status(200).json({ id: ref.id, ...data });
  } catch (error) {
    console.error(error);
    res.status(error.requestResult.statusCode).send(error.message);
  }
}
