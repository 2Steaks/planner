/** @format */

import React, { FunctionComponent } from 'react';
import { useAuth } from '@project/context';
import {
  Login,
  History,
  PrivateLayout,
  PublicLayout
} from '@project/components';

const HistoryPage: FunctionComponent = () => {
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
      <History />
    </PrivateLayout>
  );
};

export default HistoryPage;
