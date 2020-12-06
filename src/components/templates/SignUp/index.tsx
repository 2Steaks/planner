/** @format */

import React, { Fragment, FunctionComponent } from 'react';
import { Formik, Form, FormikHelpers, FormikValues } from 'formik';
import { AuthContextProps, SessionProps, useAuth } from '@project/context';
import { Input } from '@project/containers';
import {
  Button,
  ButtonType,
  ModalContextProps,
  When,
  Wrapper,
  WrapperSpacing,
  useModal
} from '@project/components';
import { initialValues, schema } from './model';

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export const SignUp: FunctionComponent = () => {
  const { signup } = useAuth() as AuthContextProps;
  const { setLoading } = useModal() as ModalContextProps;

  async function handleSubmit(
    values: FormikValues,
    { setErrors }: FormikHelpers<SignUpFormValues>
  ) {
    setLoading(true);

    try {
      await signup(values as SessionProps);
    } catch (errors) {
      if (errors.response.status === 400) {
        setErrors(errors.response.data.errors);
      }
    }

    setLoading(false);
  }

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Wrapper spacing={WrapperSpacing.SMALL}>
              <Input
                disabled={isSubmitting}
                label="First name"
                name="firstName"
              />
            </Wrapper>
            <Wrapper spacing={WrapperSpacing.SMALL}>
              <Input
                disabled={isSubmitting}
                label="Last name"
                name="lastName"
              />
            </Wrapper>
            <Wrapper spacing={WrapperSpacing.LARGE}>
              <Input disabled={isSubmitting} label="Email" name="email" />
            </Wrapper>
            <When condition={!isSubmitting}>
              <Wrapper spacing={WrapperSpacing.MEDIUM}>
                <Button disabled={isSubmitting} type={ButtonType.SUBMIT}>
                  Submit
                </Button>
              </Wrapper>
            </When>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default SignUp;
