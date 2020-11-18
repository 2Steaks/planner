/** @format */

import Iron from '@hapi/iron';
import {
  createFaunaUser,
  getFaunaToken,
  faunaAdminClient,
  faunaGuestClient,
  isExistingUserByEmail,
  magic,
  setTokenCookie
} from '@project/services';

export default async function signup(req, res) {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).send(`First name and Last name required.`);
  }

  try {
    const didToken = magic.utils.parseAuthorizationHeader(
      req.headers.authorization
    );

    const magicUser = await magic.users.getMetadataByToken(didToken);
    const isExistingUser = await faunaGuestClient.query(
      isExistingUserByEmail(magicUser.email)
    );

    if (isExistingUser) {
      return res.status(400).send(`Email ${magicUser.email} already exists`);
    }

    const newUser = await faunaGuestClient.query(
      createFaunaUser({ email: magicUser.email, firstName, lastName })
    );

    const { secret } = await faunaAdminClient.query(getFaunaToken(newUser));

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

    const { ref, data } = newUser;
    res.status(200).json({ id: ref.id, ...data });
  } catch (error) {
    console.error(error);
    res.status(error.requestResult.statusCode).send(error.message);
  }
}
