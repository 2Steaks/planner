/** @format */

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { getRouteId } from '@project/services';
import { Author, PrivateLayout } from '@project/components';

interface AuthorProps {
  id: string;
}

const AuthorPage: NextPage<AuthorProps> = ({ id }: AuthorProps) => (
  <PrivateLayout>
    <Author id={id} />
  </PrivateLayout>
);

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      id: getRouteId(context)
    }
  };
}

export default AuthorPage;
