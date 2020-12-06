/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import { getWeekFromDate } from '@project/services';
import { useAuth } from '@project/context';
import { Login, Plan, PrivateLayout, PublicLayout } from '@project/components';

const PlanPage: FunctionComponent = () => {
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
      <Plan week={getWeekFromDate(new Date())} />
    </PrivateLayout>
  );
};

export default PlanPage;
