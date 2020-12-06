/** @format */

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { getWeekFromRoute } from '@project/services';
import { useAuth } from '@project/context';
import {
  Login,
  PrivateLayout,
  PublicLayout,
  Shopping
} from '@project/components';

interface ShoppingPageProps {
  week?: string;
}

const ShoppingPage: NextPage<ShoppingPageProps> = ({
  week
}: ShoppingPageProps) => {
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
      <Shopping week={week} />
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

export default ShoppingPage;
