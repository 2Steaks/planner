/** @format */

import React, { Fragment, FunctionComponent } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { useAuth } from '@project/context';
import { Input } from '@project/containers';
import {
  Button,
  ButtonVariant,
  Heading,
  HeadingTag,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { initialValues, schema } from './model';

const Login: FunctionComponent = () => {
  const { login } = useAuth();

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={login as any}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Wrapper spacing={WrapperSpacing.LARGE}>
              <Heading tag={HeadingTag.H2}>Login</Heading>
            </Wrapper>
            <Wrapper spacing={WrapperSpacing.LARGE}>
              <Input disabled={isSubmitting} label="Email" name="email" />
            </Wrapper>
            <Wrapper spacing={WrapperSpacing.MEDIUM}>
              <Button disabled={isSubmitting} type={ButtonVariant.SUBMIT}>
                Submit
              </Button>
            </Wrapper>
          </Form>
        )}
      </Formik>
      <Link href="/signup">
        <a>click here to Sign up</a>
      </Link>
    </Fragment>
  );
};

export default Login;
