/** @format */

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { getWeekFromRoute } from '@project/services';
import { Shopping, PrivateLayout } from '@project/components';

interface ShoppingPageProps {
  week?: string;
}

const ShoppingPage: NextPage<ShoppingPageProps> = ({
  week
}: ShoppingPageProps) => (
  <PrivateLayout>
    <Shopping week={week} />
  </PrivateLayout>
);

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      week: getWeekFromRoute(context)
    }
  };
}

export default ShoppingPage;
