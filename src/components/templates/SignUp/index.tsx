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
  HeadingSize,
  HeadingTag,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { initialValues, schema } from './model';

export const SignUp: FunctionComponent = () => {
  const { signup } = useAuth();

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={signup as any}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Wrapper spacing={WrapperSpacing.LARGE}>
              <Heading size={HeadingSize.SUPER} tag={HeadingTag.H1}>
                Sign Up
              </Heading>
            </Wrapper>
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
            <Wrapper spacing={WrapperSpacing.MEDIUM}>
              <Button disabled={isSubmitting} type={ButtonVariant.SUBMIT}>
                Submit
              </Button>
            </Wrapper>
          </Form>
        )}
      </Formik>
      <Link href="/login">
        <a>click here to Login</a>
      </Link>
    </Fragment>
  );
};

export default SignUp;
