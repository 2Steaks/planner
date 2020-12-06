/** @format */

import Iron from '@hapi/iron';
import * as Yup from 'yup';
import {
  createFaunaUser,
  getFaunaToken,
  faunaAdminClient,
  faunaGuestClient,
  isExistingUserByEmail,
  magicAdmin,
  setTokenCookie
} from '@project/services';

export default async function signup(req, res) {
  const { firstName, lastName } = req.body;

  try {
    const schema = Yup.object().shape({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required')
    });

    await schema.validate({ firstName, lastName }, { abortEarly: false });
  } catch (errors) {
    return res.status(400).json({
      errors: errors.inner.reduce(
        (acc, err) => ({ ...acc, [err.path]: err.message }),
        {}
      )
    });
  }

  try {
    const didToken = magicAdmin.utils.parseAuthorizationHeader(
      req.headers.authorization
    );

    const magicUser = await magicAdmin.users.getMetadataByToken(didToken);
    const isExistingUser = await faunaGuestClient.query(
      isExistingUserByEmail(magicUser.email)
    );

    if (isExistingUser) {
      return res.status(400).json({
        errors: {
          email: 'already exists'
        }
      });
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
