/** @format */

import { faunaGuestClient, isExistingUserByEmail } from '@project/services';
import * as Yup from 'yup';

export default async function signup(req, res) {
  const { email } = req.body;

  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().required('Required')
    });

    await schema.validate({ email }, { abortEarly: false });
  } catch (errors) {
    return res.status(400).json({
      errors: errors?.inner.reduce(
        (acc, err) => ({ ...acc, [err.path]: err.message }),
        {}
      )
    });
  }

  try {
    const isExistingUser = await faunaGuestClient.query(
      isExistingUserByEmail(email)
    );

    if (isExistingUser) {
      return res.status(400).send({
        errors: {
          email: 'already exists'
        }
      });
    }

    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(error.requestResult.statusCode).send(error.message);
  }
}
