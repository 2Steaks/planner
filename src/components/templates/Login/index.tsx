/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { Breakpoints } from '@project/types';
import { AuthContextProps, useAuth } from '@project/context';
import { Input } from '@project/containers';
import {
  Button,
  ButtonType,
  Heading,
  HeadingTag,
  Modal,
  SignUp,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { initialValues, schema } from './model';
import { ButtonVariant } from '@project/components/atoms';

export interface LoginValues {
  email: string;
}

const Login: FunctionComponent = () => {
  const { login } = useAuth() as AuthContextProps;
  const [isModalActive, setIsModalActive] = useState(false);

  async function handleSubmit(
    values: FormikValues,
    { setErrors }: FormikHelpers<LoginValues>
  ) {
    try {
      await login(values as any);
    } catch (errors) {
      if (errors.response.status === 400) {
        setErrors(errors.response.data.errors);
      }
    }
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
            <Wrapper constraint={Breakpoints.TINY} centered>
              <Wrapper spacing={WrapperSpacing.LARGE}>
                <Heading tag={HeadingTag.H2}>Login</Heading>
              </Wrapper>
              <Wrapper spacing={WrapperSpacing.LARGE}>
                <Input disabled={isSubmitting} label="Email" name="email" />
              </Wrapper>
              <Wrapper spacing={WrapperSpacing.MEDIUM}>
                <Button disabled={isSubmitting} type={ButtonType.SUBMIT}>
                  Submit
                </Button>
              </Wrapper>
              <When condition={!isSubmitting}>
                <Button
                  onClick={() => setIsModalActive(true)}
                  variant={ButtonVariant.NONE}
                >
                  <a>click here to Sign up</a>
                </Button>
              </When>
            </Wrapper>
          </Form>
        )}
      </Formik>
      <Modal
        title="Sign up"
        isActive={isModalActive}
        onClose={() => setIsModalActive(false)}
      >
        <SignUp />
      </Modal>
    </Fragment>
  );
};

export default Login;
