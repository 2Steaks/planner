/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import { useAuth } from '@project/context';
import {
  Login,
  PrivateLayout,
  Profile,
  PublicLayout
} from '@project/components';

const ProfilePage: FunctionComponent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <Login />
      </PublicLayout>
    );
  }

  return (
    <PrivateLayout>
      <Profile />
    </PrivateLayout>
  );
};

export default ProfilePage;
