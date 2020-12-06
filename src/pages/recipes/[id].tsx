/** @format */

import React from 'react';
import { useAuth } from '@project/context';
import { NextPage, NextPageContext } from 'next';
import { getRouteId } from '@project/services';
import { Recipe, PrivateLayout, PublicLayout } from '@project/components';

interface RecipePageProps {
  id?: string;
}

const RecipePage: NextPage<RecipePageProps> = ({ id }: RecipePageProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <Recipe id={id} />
      </PublicLayout>
    );
  }

  return (
    <PrivateLayout>
      <Recipe id={id} />
    </PrivateLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      id: getRouteId(context)
    }
  };
}

export default RecipePage;
