/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import { getWeekFromDate } from '@project/services';
import { Plan, PrivateLayout } from '@project/components';

const PlanPage: FunctionComponent = () => {
  return (
    <PrivateLayout>
      <Plan week={getWeekFromDate(new Date())} />
    </PrivateLayout>
  );
};

export default PlanPage;
