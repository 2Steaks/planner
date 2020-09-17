/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import { PrivateLayout, Profile } from '@project/components';

const ProfilePage: FunctionComponent = () => (
  <PrivateLayout>
    <Profile />
  </PrivateLayout>
);

export default ProfilePage;
