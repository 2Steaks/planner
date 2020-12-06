/** @format */

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { getWeekFromRoute } from '@project/services';
import { useAuth } from '@project/context';
import { Login, Plan, PrivateLayout, PublicLayout } from '@project/components';

interface PlanPageProps {
  week?: string;
}

const PlanPage: NextPage<PlanPageProps> = ({ week }: PlanPageProps) => {
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
      <Plan week={week} />
    </PrivateLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      week: getWeekFromRoute(context)
    }
  };
}

export default PlanPage;
