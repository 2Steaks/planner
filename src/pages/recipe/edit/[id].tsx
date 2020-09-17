/** @format */

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { getRouteId } from '@project/services';
import { Recipe, PrivateLayout } from '@project/components';

interface RecipePageProps {
  id?: string;
}

const RecipePage: NextPage<RecipePageProps> = ({ id }: RecipePageProps) => (
  <PrivateLayout>
    <Recipe id={id} />
  </PrivateLayout>
);

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      id: getRouteId(context)
    }
  };
}

export default RecipePage;
