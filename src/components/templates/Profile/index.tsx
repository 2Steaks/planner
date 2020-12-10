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
import { useGraphMutation, useLocalStorage } from '@project/hooks';
import { BackButton, Input, RangeInput } from '@project/containers';
import {
  AppBar,
  AvatarUploader,
  Button,
  ButtonVariant,
  ButtonType,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexAlignItems,
  FlexColumn,
  Grid,
  GridColumn,
  Heading,
  HeadingSize,
  HeadingTag,
  InputType,
  Label,
  PushNotificationButton,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { schema } from './model';
import { EmailNotificationIcon } from './styles';

const Profile: FunctionComponent = () => {
  const { logout, user, setUser } = useAuth() as AuthContextProps & {
    user: any;
  };

  const [isEmailActive, setEmailActive] = useLocalStorage(
    'email-notifications',
    false
  );

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
            <AppBar isSticky>
              <Wrapper spacing={WrapperSpacing.MEDIUM}>
                <Flex alignItems={FlexAlignItems.BASELINE}>
                  <FlexColumn shrink={1}>
                    <BackButton url="/" />
                  </FlexColumn>
                  <FlexColumn grow={1}>
                    <Heading>Profile</Heading>
                  </FlexColumn>
                </Flex>
              </Wrapper>
            </AppBar>
            <Wrapper constraint={Breakpoints.SMALL}>
              <Grid>
                <GridColumn xs={12} md={6}>
                  <Heading size={HeadingSize.H3} tag={HeadingTag.H2}>
                    Details
                  </Heading>
                  <Wrapper spacing={WrapperSpacing.MEDIUM}>
                    <AvatarUploader
                      disabled={isSubmitting}
                      label="Upload an photo"
                      name="image"
                      onChange={handleImageUpload}
                      value={prop('avatar', values)}
                    />
                  </Wrapper>
                  <Wrapper spacing={WrapperSpacing.MEDIUM}>
                    <Input
                      disabled={isSubmitting}
                      label="First name"
                      name="firstName"
                    />
                  </Wrapper>
                  <Wrapper spacing={WrapperSpacing.MEDIUM}>
                    <Input
                      disabled={isSubmitting}
                      label="Last name"
                      name="lastName"
                    />
                  </Wrapper>
                  <Wrapper spacing={WrapperSpacing.MEDIUM}>
                    <Input
                      disabled={isSubmitting}
                      label="Email Address"
                      name="email"
                      type={InputType.EMAIL}
                    />
                  </Wrapper>
                </GridColumn>
                <GridColumn xs={12} md={6}>
                  <Heading size={HeadingSize.H3} tag={HeadingTag.H2}>
                    Settings
                  </Heading>
                  <Wrapper spacing={WrapperSpacing.MEDIUM}>
                    <RangeInput
                      disabled={isSubmitting}
                      label="Calorie Allowance"
                      name="calories"
                      min={0}
                      max={5000}
                      step={50}
                    />
                  </Wrapper>

                  <Wrapper spacing={WrapperSpacing.MEDIUM}>
                    <Label>Recieve push notifications</Label>
                    <PushNotificationButton />
                  </Wrapper>
                  <Wrapper spacing={WrapperSpacing.MEDIUM}>
                    <Label>Recieve email notifications</Label>
                    <Button
                      onClick={() => setEmailActive((bool: boolean) => !bool)}
                    >
                      <EmailNotificationIcon isActive={isEmailActive} />
                    </Button>
                  </Wrapper>
                </GridColumn>
              </Grid>
            </Wrapper>

            <hr />

            <Flex>
              <When condition={dirty}>
                <FlexColumn>
                  <Button disabled={isSubmitting} type={ButtonType.SUBMIT}>
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
                  variant={ButtonVariant.WARNING}
                  onClick={logout}
                >
                  Log out
                </Button>
              </FlexColumn>
            </Flex>
          </Form>
        )}
      </Formik>
    </ErrorBoundary>
  );
};

export default Profile;
