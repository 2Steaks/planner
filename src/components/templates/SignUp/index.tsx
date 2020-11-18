/** @format */

import React, { Fragment, FunctionComponent } from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { AuthContextProps, SessionProps } from '@project/context';
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

export const SignUp: FunctionComponent<Pick<AuthContextProps, 'signup'>> = ({
  signup
}: Pick<AuthContextProps, 'signup'>) => {
  const { setLoading } = useModal() as ModalContextProps;

  async function handleSubmit(values: FormikValues) {
    setLoading(true);
    await signup(values as SessionProps);
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
