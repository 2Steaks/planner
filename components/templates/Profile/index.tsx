/** @format */

import React, { FunctionComponent } from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { compose, prop } from 'ramda';
import { Breakpoints } from '@project/types';
import { UPDATE_USER } from '@project/graphql';
import { useAuth, AuthContextProps } from '@project/context';
import {
  createUserQuery,
  createUserQueryProps,
  uploadImage
} from '@project/services';
import { useGraphMutation } from '@project/hooks';
import { Input, RangeInput } from '@project/containers';
import {
  AvatarUploader,
  Button,
  ButtonTheme,
  ButtonVariant,
  Drawer,
  DrawerPosition,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexColumn,
  Heading,
  InputVariant,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { schema } from './model';

const Profile: FunctionComponent = () => {
  const { logout, user, setUser } = useAuth() as AuthContextProps & {
    user: any;
  };

  const [updateUser] = useGraphMutation(UPDATE_USER, {
    onSuccess: compose(setUser, prop('updateUser') as any)
  });

  async function handleImageUpload(formData: any) {
    const avatar = await uploadImage(formData);

    updateUser(createUserQuery({ ...user, avatar }));
  }

  function handleSubmit(values: FormikValues) {
    updateUser(createUserQuery(values as createUserQueryProps));
  }

  function handleReset(formProps: any) {
    return function () {
      formProps && formProps.resetForm({ values: user });
    };
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Formik
        enableReinitialize
        initialValues={user}
        validationSchema={schema}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {({ dirty, isSubmitting, values, ...formProps }) => (
          <Form>
            <Wrapper spacing={WrapperSpacing.LARGE}>
              <Heading>Profile</Heading>
            </Wrapper>
            <Wrapper
              constraint={Breakpoints.TINY}
              spacing={WrapperSpacing.MEDIUM}
            >
              <AvatarUploader
                disabled={isSubmitting}
                label="Upload an photo"
                name="image"
                onChange={handleImageUpload}
                value={prop('avatar', values)}
              />
            </Wrapper>
            <Wrapper
              constraint={Breakpoints.TINY}
              spacing={WrapperSpacing.MEDIUM}
            >
              <Input
                disabled={isSubmitting}
                label="First name"
                name="firstName"
              />
            </Wrapper>
            <Wrapper
              constraint={Breakpoints.TINY}
              spacing={WrapperSpacing.MEDIUM}
            >
              <Input
                disabled={isSubmitting}
                label="Last name"
                name="lastName"
              />
            </Wrapper>
            <Wrapper
              constraint={Breakpoints.TINY}
              spacing={WrapperSpacing.MEDIUM}
            >
              <Input
                disabled={isSubmitting}
                label="Email Address"
                name="email"
                type={InputVariant.EMAIL}
              />
            </Wrapper>
            <Wrapper
              constraint={Breakpoints.TINY}
              spacing={WrapperSpacing.MEDIUM}
            >
              <RangeInput
                disabled={isSubmitting}
                label="Calorie Allowance"
                name="calories"
                min={0}
                max={2000}
              />
            </Wrapper>

            {/* <Wrapper spacing={WrapperSpacing.MEDIUM}>
              <Switch
                name="push_notifications"
                label="Recieve push notifications"
              />
            </Wrapper>
            <Wrapper spacing={WrapperSpacing.MEDIUM}>
              <Switch
                name="email_notifications"
                label="Recieve email notifications"
              />
            </Wrapper> */}

            <Drawer padding position={DrawerPosition.BOTTOM}>
              <Flex>
                <When condition={dirty}>
                  <FlexColumn>
                    <Button disabled={isSubmitting} type={ButtonVariant.SUBMIT}>
                      Save
                    </Button>
                  </FlexColumn>
                  <FlexColumn>
                    <Button
                      disabled={isSubmitting}
                      onClick={handleReset(formProps)}
                    >
                      Reset
                    </Button>
                  </FlexColumn>
                </When>
                <FlexColumn>
                  <Button
                    disabled={isSubmitting}
                    theme={ButtonTheme.WARNING}
                    onClick={logout}
                  >
                    Log out
                  </Button>
                </FlexColumn>
              </Flex>
            </Drawer>
          </Form>
        )}
      </Formik>
    </ErrorBoundary>
  );
};

export default Profile;
