/** @format */

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { getWeekFromRoute } from '@project/services';
import { Plan, PrivateLayout } from '@project/components';

interface PlanPageProps {
  week?: string;
}

const PlanPage: NextPage<PlanPageProps> = ({ week }: PlanPageProps) => (
  <PrivateLayout>
    <Plan week={week} />
  </PrivateLayout>
);

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      week: getWeekFromRoute(context)
    }
  };
}

export default PlanPage;
