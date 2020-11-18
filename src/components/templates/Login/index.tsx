/** @format */

import React, { Fragment, FunctionComponent, useState } from 'react';
import { Formik, Form } from 'formik';
import { AuthContextProps } from '@project/context';
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

const Login: FunctionComponent<AuthContextProps> = ({
  login,
  signup
}: AuthContextProps) => {
  const [isModalActive, setIsModalActive] = useState(false);

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
          </Form>
        )}
      </Formik>
      <Modal
        title="Sign up"
        isActive={isModalActive}
        onClose={() => setIsModalActive(false)}
      >
        <SignUp signup={signup} />
      </Modal>
    </Fragment>
  );
};

export default Login;
